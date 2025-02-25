import axios from "axios";
const BASE_URL = require("./BaseUrl.json").value;
const addCred = {
  withCredentials: false,
};

export const fetchAll = async () => {
  try {
    const url = `${BASE_URL}/api/satisfactionsurvey`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchOne = async (id) => {
  try {
    const url = `${BASE_URL}/api/satisfactionsurvey/${id}`;
    const res = await axios.post(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
//
export const fetchOneByEmployee = async (empId) => {
  try {
    const url = `${BASE_URL}/api/offboarding/find/employee`;
    const res = await axios.post(url, { empId: empId }, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
Expected data format
{
    "name": "Manager Survey997",
    "welcomeTitle": "Satisfaction Survey 2025",
    "welcomeMessage": "Please be factual.",
    "endTitle": "Satisfaction Survey 2025",
    "endMessage": "Thank you for taking the time to provide feedback.",
    "startedAt": "2024-08-31T05:00:00.000Z",
    "completedAt": null,
    "anonymous": false,
    "satisfactionSurveyRecipients": [20, 15], //*** representing employee ids
       "satisfactionSurveyQuestions": [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
        "Labore et dolore magna aliqua. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus.",
        ],
    "frontendUrl": "http://localhost:3000/" //*** to be generated dynamically
}
*/
export const createOne = async (data) => {
  try {
    const url = `${BASE_URL}/api/satisfactionsurvey`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
/**
 * 
 * @param {*} data 
 * {
    "id": 4,
    "name": "Consumer Survey Quay",
    "welcomeTitle": "Satisfaction Survey 2029",
    "welcomeMessage": "Please be facts.",
    "endTitle": "Satisfaction Survey 2025",
    "endMessage": "plolThank you for taking the time to provide feedback.",
    "startedAt": "2024-08-31T05:00:00.000Z",
    "completedAt": "2024-08-31T05:00:00.000Z",
} values should contain new values.
 * @returns 
 */

//

export const update = async (data) => {
  try {
    const url = `${BASE_URL}/api/satisfactionsurvey`;
    const res = await axios.put(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// This route allows a respondent to start a survey
export const startSurvey = async (token) => {
  try {
    const url = `${BASE_URL}/api/satisfactionsurvey/questions/start`;
    const res = await axios.post(url, { token: token }, addCred);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
/**
 * 
 * @param {*} data 
 * {
        respondentId,
        hasCompleted - boolean,
        satisfactionSurveyResponses: [{id, question, answer}, {id, question, answer}]
    }
 * @returns 
 */
export const submitSurvey = async (data) => {
  try {
    const url = `${BASE_URL}/api/satisfactionsurvey/questions/submit`;
    const res = await axios.post(url, data);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};


// Expected data format
// { id --surveyId
// satisfactionSurveyRecipients:[1,2,3] -- array of employee ides
// frontendUrl 
// }
export const sendSurvey = async (data) => {
  try {
    const url = `${BASE_URL}/api/satisfactionsurvey/questions/send`;
    const res = await axios.post(url, data);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// Route to download results in csv format
// expected data format {surveyId: 2}
export const downloadSurveyResults = async (surveyId) => {
  try {
    const url = `${BASE_URL}/api/satisfactionsurvey/results/download`;
    const res = await axios.post(url, {surveyId: surveyId});
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const remove = async (surveyId) => {
  try {
    const url = `${BASE_URL}/api/satisfactionsurvey/${surveyId}`;
    const res = await axios.delete(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};