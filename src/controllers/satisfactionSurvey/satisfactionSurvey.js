const db = require("../../../models");
require("dotenv").config();
const crypto = require("crypto");
const csvjson = require("csvjson");
const dayjs = require("dayjs");
const message = require("../../../constants/messages.json");
const EmailService = require("../../helper/emailServices");

// Utility function to fetch responses
const fetchResponseBySurveyId = async (surveyId) => {
  const data = await db.satisfactionSurveyRespondent.findAll({
    attributes: ["name", "teamName"],
    include: [
      {
        model: db.satisfactionSurveyResponse,
        attributes: ["orderNumber", "question", "answer"],
      },
    ],
    order: [
      "name",
      [db.sequelize.col("satisfactionSurveyResponses.orderNumber"), "ASC"],
    ],
    where: { surveyId: surveyId, hasCompleted: true },
  });
  return data;
};

const surveyQueryObject = {
  attributes: { exclude: ["createdAt", "updatedAt"] },
  include: [
    {
      model: db.satisfactionSurveyRecipient,
    },
    {
      model: db.satisfactionSurveyQuestion,
      attributes: ["id", "orderNumber", "question"],
    },
  ],
};
const formatSurveyObject = async (surveyObject) => {
  const recipients = await db.satisfactionSurveyRecipient.findAll({
    where: { surveyId: surveyObject.id },
  });
  const satisfactionSurveyAnswers = await fetchResponseBySurveyId(
    surveyObject.id
  );

  const newData = {
    ...surveyObject.toJSON(),
    satisfactionSurveyRecipients: recipients,
    satisfactionSurveyAnswers,
    respondentCount: satisfactionSurveyAnswers.length,
  };
  return newData;
};

// Utility function to resend non-anonymous survey to an existing respondent.
// It returns -1 if no survey is sent or empId if otherwise.
const resendSurveyTo = async ({ surveyObject, empId, frontendUrl }) => {
  const employee = await db.employee.findByPk(empId, {
    attributes: ["firstName", "lastName", "email"],
    order: ["firstName", "lastName"],
  });

  // Find respondent
  const respondent = await db.satisfactionSurveyRespondent.findOne({
    where: {
      surveyId: surveyObject.id,
      empId: empId,
      hasCompleted: false,
    },
  });
  if (!respondent) {
    return -1;
  }
  // Generate a random token
  const accessToken = crypto.randomBytes(64).toString("hex");
  // Hash token
  const hashedToken = crypto
    .createHash("sha256")
    .update(accessToken)
    .digest("hex");

  // Update accessToken
  await respondent.set({ accessToken: hashedToken });
  await respondent.save();

  const emailData = [];
  emailData.push({
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    accessToken,
  });

  // Send email to the recipients
  await sendEmail({ surveyObject, emailData, frontendUrl });
  return empId;
};

const sendEmail = async ({ surveyObject, emailData, frontendUrl }) => {
  const emailService = new EmailService();
  const endDate = surveyObject.completedAt
    ? dayjs(surveyObject.completedAt).format("MMMM D, YYYY")
    : null;
  // Obtain company name
  const company = await db.company.findOne({
    attributes: ["companyName"],
  });

  for (let employee of emailData) {
    // Create and send email
    const context = {
      companyName: company ? `${company.companyName}` : "BlueWave Labs",
      surveyName: surveyObject.name,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      url: `${frontendUrl}${employee.accessToken}`, // Unique url
      email: process.env.EMAIL, // Support email
      copyrightYear: new Date().getFullYear(),
      endDate,
    };

    const messageId = await emailService.buildAndSendEmail(
      "satisfactionSurveyInvitation", // Template name
      context,
      employee.email, // receiver's email
      surveyObject.name // Subject
    );
    console.log(`Email sent successfully! Message ID: ${messageId}`);
  }
};

const createRespondents = async ({ surveyId, anonymous, empIds }) => {
  const employees = await db.employee.findAll({
    attributes: ["empId", "firstName", "lastName", "email"],
    include: [
      {
        model: db.team,
        attributes: ["teamName"],
      },
    ],
    where: { empId: empIds },
    order: ["firstName", "lastName"],
  });

  // Create respondents
  let respondents = [];
  // Create email data. Each respondent has a unique access token
  const emailData = [];

  for (let employee of employees) {
    // Generate a random token
    const accessToken = crypto.randomBytes(64).toString("hex");
    // Hash token
    const hashedToken = crypto
      .createHash("sha256")
      .update(accessToken)
      .digest("hex");

    let teamName = null;
    if (anonymous) {
      teamName = "Anonymous";
    } else if (employee.team) {
      teamName = employee.team.teamName;
    }

    const respondent = {
      name: anonymous
        ? "Anonymous"
        : `${employee.firstName} ${employee.lastName}`,
      teamName,
      surveyId,
      empId: anonymous ? null : employee.empId,
      accessToken: hashedToken,
      hasCompleted: false,
    };
    respondents.push(respondent);
    emailData.push({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      accessToken,
    });
  }
  respondents = await db.satisfactionSurveyRespondent.bulkCreate(respondents, {
    validate: true,
  });
  return emailData;
};

const createResponses = async (surveyId) => {
  const query = `SELECT r.id "respondentId", q."orderNumber", q.question FROM "satisfactionSurveyRespondent" r JOIN "satisfactionSurveyQuestion" q ON r."surveyId" = q."surveyId" WHERE r."surveyId" = :surveyId ORDER BY 1, 2;`;
  const [results, metadata] = await db.sequelize.query(query, {
    replacements: { surveyId: surveyId },
  });
  if (results.length > 0) {
    await db.satisfactionSurveyResponse.bulkCreate(results, {
      validate: true,
    });
  }
};

const createResponsesForExistingSurvey = async (surveyId) => {
  const query = `SELECT rt.id "respondentId", q."orderNumber", q.question
                FROM "satisfactionSurveyRespondent" rt
                LEFT JOIN "satisfactionSurveyResponse" rs ON rs."respondentId" = rt.id 
                JOIN "satisfactionSurveyQuestion" q ON q."surveyId" = rt."surveyId"
                WHERE rs."respondentId" IS NULL AND rt."surveyId" = :surveyId;`;

  const [results, metadata] = await db.sequelize.query(query, {
    replacements: { surveyId: surveyId },
  });

  if (results.length > 0) {
    await db.satisfactionSurveyResponse.bulkCreate(results);
  }
};

exports.showAll = async (req, res) => {
  try {
    const data = await db.satisfactionSurvey.findAll(surveyQueryObject);
    if (!data) {
      return res.send("No results found");
    }
    const surveys = [];
    for (let d of data) {
      const newData = await formatSurveyObject(d);
      surveys.push(newData);
    }
    res.send(surveys);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.showOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await db.satisfactionSurvey.findByPk(id, surveyQueryObject);
    if (data === null) {
      res.status(400).send("Not found!");
    } else {
      const newData = await formatSurveyObject(data);
      res.status(200).send(newData);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.createRecord = async (req, res) => {
  try {
    const satisfactionSurveyRecipients = req.body.satisfactionSurveyRecipients;
    const satisfactionSurveyQuestions = req.body.satisfactionSurveyQuestions;
    const frontendUrl = req.body.frontendUrl;

    const data = await db.satisfactionSurvey.create(req.body);
    const surveyId = data.id;

    if (satisfactionSurveyQuestions) {
      // Save questions
      const questions = [];
      for (let question of satisfactionSurveyQuestions) {
        const questionData = {
          surveyId,
          orderNumber: question.orderNumber,
          question: question.question,
        };
        questions.push(questionData);
      }
      if (questions.length > 0) {
        await db.satisfactionSurveyQuestion.bulkCreate(questions, {
          validate: true,
        });
      }
    }

    if (satisfactionSurveyRecipients) {
      // Save recipient data
      const recipients = [];
      const empIds = [];
      for (let recipient of satisfactionSurveyRecipients) {
        recipients.push({ surveyId, ...recipient });
        empIds.push(recipient.empId);
      }
      await db.satisfactionSurveyRecipient.bulkCreate(recipients, {
        validate: true,
      });
      // Create respondent data
      const emailData = await createRespondents({
        surveyId,
        anonymous: data.anonymous,
        empIds,
      });
      if (satisfactionSurveyQuestions) {
        // Create response data
        createResponses(surveyId);
      }
      // Send email to the recipients
      await sendEmail({ surveyObject: data, emailData, frontendUrl });
    }

    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.startSurvey = async (req, res) => {
  try {
    if (!req.body.token) {
      return res.status(400).json({
        error: message.invalidToken,
      });
    }

    //Hash the plain token
    const token = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");

    //Find respondent record based on the token
    const respondent = await db.satisfactionSurveyRespondent.findOne({
      attributes: {
        exclude: ["accessToken", "empId", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: db.satisfactionSurveyResponse,
          attributes: ["id", "orderNumber", "question", "answer"],
        },
      ],
      where: { accessToken: token, hasCompleted: false }, //cannot access survey after submission
      order: [[{ model: db.satisfactionSurveyResponse }, "orderNumber", "ASC"]],
    });
    if (!respondent) {
      // If respondent is null, the token is invalid or survey has been completed
      return res.status(400).json({
        error: message.invalidToken,
      });
    }

    if (!respondent.satisfactionSurveyResponses || (respondent.satisfactionSurveyResponses && respondent.satisfactionSurveyResponses.length === 0)) {
      // no questions attached. This is not expected to happen.as been completed
      return res.status(400).json({
        error: message.invalidToken,
      });
    }

    //Check if deadline for submission has not passed
    const survey = await db.satisfactionSurvey.findOne({
      where: {
        id: respondent.surveyId,
        [db.Sequelize.Op.or]: [
          {
            completedAt: null,
          },
          { completedAt: { [db.Sequelize.Op.gt]: Date.now() } },
        ],
      },
    });

    if (!survey) {
      return res.status(400).json({
        error: message.invalidToken,
      });
    }

    if (!respondent.startedAt) {
      // Set start time
      await respondent.set({ startedAt: new Date() });
      await respondent.save();
    }
    const respondentData = { ...respondent.dataValues };
    const finalData = { ...survey.toJSON(), respondent: respondentData };
    delete finalData.createdAt;
    delete finalData.updatedAt;
    delete finalData.satisfactionSurveyQuestions;
    delete finalData.respondent.updatedAt;

    res.status(200).send(finalData);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

exports.submitSurvey = async (req, res) => {
  console.log(req.body);
  const { respondentId, hasCompleted, satisfactionSurveyResponses } = req.body;
  try {
    for (let reponse of satisfactionSurveyResponses) {
      const data = await db.satisfactionSurveyResponse.findByPk(reponse.id);
      await data.set({ answer: reponse.answer });
      await data.save();
    }
    if (hasCompleted) {
      // Finalize the responses
      const data = await db.satisfactionSurveyRespondent.findByPk(respondentId);
      await data.set({
        hasCompleted: true,
        accessToken: null,
        completedAt: new Date(),
      });
      await data.save();
    }
    res
      .status(200)
      .send(hasCompleted ? "Survey submitted." : "Responses updated.");
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

// Send url of an existing survey to an array of recipients
exports.sendSurvey = async (req, res) => {
  try {
    /**
     *  satisfactionSurveyRecipients = {
      empId: 20,
      category: "Category9",
      teamName: "Development",
      name: "Kettie Nortcliffe",
    };
     */
    const { id, satisfactionSurveyRecipients, frontendUrl } = req.body;
    const survey = await db.satisfactionSurvey.findByPk(id);
    if (!survey) {
      return res.status(400).json({
        error: `No satifaction survey is associated with id ${id}`,
      });
    }
    if (survey.completedAt && survey.completedAt < new Date()) {
      return res.status(400).json({
        error: `The satifaction survey associated with id ${id} has been completed`,
      });
    }

    const existingRecipient = [];
    const newRecipient = []; // for sending email
    const recipientData = []; // to be saved in the database
    for (let recipient of satisfactionSurveyRecipients) {
      const result = await db.satisfactionSurveyRecipient.findOne({
        where: {
          surveyId: id,
          empId: recipient.empId,
        },
      });
      if (result) {
        // Survey already sent to the recipient
        if (!survey.anonymous) {
          const result = await resendSurveyTo({
            surveyObject: survey,
            empId: recipient.empId,
            frontendUrl,
          });
          if (result > -1) {
            existingRecipient.push(recipient);
          }
        }
      } else {
        // Save recipient data
        recipient.surveyId = id;
        recipientData.push(recipient);
        newRecipient.push(recipient.empId);
      }
    }
   
    await db.satisfactionSurveyRecipient.bulkCreate(recipientData, {
      validate: true,
    });

    // Create respondent data
    const emailData = await createRespondents({
      surveyId: id,
      anonymous: survey.anonymous,
      empIds: newRecipient,
    });

    // Create responses for new respondents
    createResponsesForExistingSurvey(id);
   
    // Send email to the recipients
   await sendEmail({ surveyObject: survey, emailData, frontendUrl });
    res.status(200).send({
      newRecipient: newRecipient.length,
      existingRecipient: existingRecipient.length,
    });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  try {
    const data = await db.satisfactionSurvey.findByPk(updatedData.id);
    data.set(updatedData);
    await data.save();
    res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const id = req.params.id;
    // Remove instances of the survey from the recipient table
    const recipientRecordDeleted = await db.satisfactionSurveyRecipient.destroy(
      {
        where: { surveyId: id },
      }
    );

    // Remove instances of the survey from the question table
    const questionRecordDeleted = await db.satisfactionSurveyQuestion.destroy({
      where: {
        surveyId: id,
      },
    });

    // Find all respondents pertaining to the survey
    const respondents = await db.satisfactionSurveyRespondent.findAll({
      attributes: ["id"],
      where: {
        surveyId: id,
      },
    });

    // Extract respondent ids
    const respondentIds = [];
    for (let respondent of respondents) {
      respondentIds.push(respondent.id);
    }

    // Remove instances of the survey from the response table
    const responseRecordDeleted = await db.satisfactionSurveyResponse.destroy({
      where: { respondentId: respondentIds },
    });

    // Remove instances of the survey from the respondent table
    const respondentRecordDeleted =
      await db.satisfactionSurveyRespondent.destroy({
        where: {
          surveyId: id,
        },
      });

    // Remove survey itself
    const surveyRecordDeleted = await db.satisfactionSurvey.destroy({
      where: { id: id },
    });

    if (surveyRecordDeleted == 1) {
      res.send({
        recordDeleted:
          surveyRecordDeleted +
          recipientRecordDeleted +
          questionRecordDeleted +
          respondentRecordDeleted +
          responseRecordDeleted,
        surveyRecordDeleted,
        recipientRecordDeleted,
        questionRecordDeleted,
        respondentRecordDeleted,
        responseRecordDeleted,
      });
    } else {
      res.send({
        message: message.failed,
      });
    }
  } catch (err) {
    res.send({
      message: err.message || message.failed,
    });
  }
};
exports.showResults = async (req, res) => {
  try {
    const { surveyId } = req.body;
    const query = `SELECT
        s.name as "surveyName", 
        s."startedAt" as "surveyStartedAt", 
        s."completedAt" as "surveyCompletedAt",
        r."empId" as "respondentEmpId",
        r.name as "respondentName",
        rs."orderNumber" as "questionNumber",
        rs.question as "question",
        rs.answer as "answer"
        FROM "satisfactionSurvey" s 
        JOIN "satisfactionSurveyRespondent" r ON s.id = r."surveyId" 
        JOIN "satisfactionSurveyResponse" rs ON r.id=rs."respondentId"
        WHERE s.id = :id;`;
    const [results, metadata] = await db.sequelize.query(query, {
      replacements: { id: surveyId },
    });

    if (results.length === 0) {
      results.push({ message: "No result found" });
    }

    const csvData = csvjson.toCSV(results, {
      headers: "key",
      quote: '"',
    });
    const finalResult = btoa(csvData);
    res.status(200).send(finalResult);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
