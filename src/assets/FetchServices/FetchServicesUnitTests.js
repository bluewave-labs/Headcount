const api = require("./index");
const dayjs = require("dayjs");

//Utility function to run generic tests
const runTest = async ({
  title = "API Call Module Test",
  api,
  id,
  createOneTestData,
  updateTestData,
}) => {
  console.log(title);

  // Test 1
  try {
    const res = await api.fetchAll();
    console.log("Test 1 - fetchAll", resultStatement(res.length > 0));
  } catch (error) {
    console.log("Test 1 - fetchAll failed - error");
  }

  // Test 2
  try {
    const res = await api.fetchOne(1);
   // console.log(res);
    console.log("Test 2 - fetchOne", resultStatement(res[id] === 1));
  } catch (error) {
    console.log("Test 2 - fetchOne failed - error");
  }

  // Test 3
  try {
    const res = await api.createOne(createOneTestData);
    console.log("Test 3 - createOne", resultStatement(res));
  } catch (error) {
    console.log("Test 3 - createOne failed - error");
  }

  // Test 4
  try {
    const res = await api.update(updateTestData);
    //console.log(res);
    console.log("Test 4 update", resultStatement(res));
  } catch (error) {
    console.log("Test 4 update failed - error");
  }
  // Test 5
  try {
    const res = await api.remove(3);
    console.log("Test 5 - remove", resultStatement(res));
  } catch (error) {
    console.log("Test 5 - remove failed error");
  }
};

/**
 * Utility function to display results
 * @param {boolean} passed
 * @returns string passed or failed
 */
const resultStatement = (passed) => {
  return passed ? "passed" : "failed - invalid results";
};

const timeStamp = () => dayjs().format("YYYY-MM-DD_hhmmss");

const runDepartmentTests = async () => {
  const createOneTestData = {
    departmentName: `Test Department_${timeStamp()}`,
    departmentManagerId: 53,
  };
  const updateTestData = {
    id: 2,
    departmentName: `Update test_${timeStamp()}`,
    departmentManagerId: 1,
  };

  await runTest({
    title: "Department API Call Module Test",
    api: api.department,
    id: "id",
    createOneTestData,
    updateTestData,
  });

  const data = [
    { departmentName: "Department1_" + timeStamp() },
    { departmentName: "Department2_" + timeStamp() },
    { departmentName: "Department3_" + timeStamp() },
    { departmentName: "Department4_" + timeStamp() },
    { departmentName: "Department5_" + timeStamp() },
  ];

  // Test 6
  try {
    const res = await api.department.createMany(data);
    console.log("Test 6 - createMany", resultStatement(res));
  } catch (error) {
    console.log("Test 6 - createMany failed - error");
  }

  // Test 7
  try {
    const res = await api.department.exists("Backend Developer");
    console.log("Test 7 - check", resultStatement(res));
  } catch (error) {
    console.log("Test 7 - check failed - error");
  }

  console.log("Department API Call Module Test completed");
};

const runDocumentTests = async () => {
  const createOneTestData = {
    documentName: "Appointment letter_" + timeStamp(),
    documentDescription: "Initial appointment",
    empId: 59,
    dateUploaded: "2019-10-29T14:38:14.125Z",
    documentFile:
      "eyJlbXBJZCI6NTksImZpcnN0TmFtZSI6IklhaW4iLCJMYXN0TmFtZSI6IlllcnJpbmd0b24iLCJwcmVmZXJyZWROYW1lIjoiSWFpbiIsImdlbmRlciI6Ik1hbGUiLCJlbWFpbCI6ImlhaW4ueWVycmluZ3RvbkBibHVld2F2ZWxhYnMuY2EiLCJwaG9uZU51bWJlciI6IjU4NzczOTM3MTgiLCJuYXRpb25hbGl0eSI6IkRvbWluaWNhbiBSZXB1YmxpYyIsIm1hcml0YWxTdGF0dXMiOiJXaWRvd2VkIiwiYWRkcmVzc0lkIjoyOSwiaGlyZURhdGUiOiIyMDE5LTEwLTI5VDE0OjM4OjE0LjEyNVoiLCJyb2xlSWQiOjMsInNhbGFyeSI6MTA1NDgsImRlcGFydG1lbnRJZCI6MSwibWFuYWdlcklkIjo1MywiZW1wbG95bWVudFR5cGUiOiJFbXBsb3ltZW50IG9uIGNvbW1pc3Npb24iLCJjb21wZW5zYXRpb25UeXBlIjoiQm9udXNlcyIsImNvbXBlbnNhdGlvbiI6IkJpLXdlZWtseSIsIndlZWtseUhvdXJzIjozNCwib2ZmaWNlTG9jYXRpb24iOiJXYWxudXQgR3JvdmUiLCJ0ZWFtSWQiOjF9",
  };

  const updateTestData = {
    id: 2,
    documentName: "Resume",
    documentDescription: "my resume",
    empId: 75,
    dateUploaded: "2013-07-05T12:05:11.412Z",
    documentFile:
      "eyJlbXBJZCI6NzUsImZpcnN0TmFtZSI6IkFibmVyIiwiTGFzdE5hbWUiOiJDdW5kZXkiLCJwcmVmZXJyZWROYW1lIjoiQWJuZXIiLCJnZW5kZXIiOiJNYWxlIiwiZW1haWwiOiJhYm5lci5jdW5kZXlAYmx1ZXdhdmVsYWJzLmNhIiwicGhvbmVOdW1iZXIiOiI2MTM2MTIyNDY4IiwibmF0aW9uYWxpdHkiOiJIdW5nYXJ5IiwibWFyaXRhbFN0YXR1cyI6IlNlcGFyYXRlZCIsImFkZHJlc3NJZCI6OTMsImhpcmVEYXRlIjoiMjAxMy0wNy0wNVQxMjowNToxMS40MTJaIiwicm9sZUlkIjoxNSwic2FsYXJ5Ijo3NDYwLCJkZXBhcnRtZW50SWQiOjEwLCJtYW5hZ2VySWQiOjM4LCJlbXBsb3ltZW50VHlwZSI6IkludGVybnNoaXAiLCJjb21wZW5zYXRpb25UeXBlIjoiVG90YWwgY29tcGVuc2F0aW9uIiwiY29tcGVuc2F0aW9uIjoiQmktd2Vla2x5Iiwid2Vla2x5SG91cnMiOjIzLCJvZmZpY2VMb2NhdGlvbiI6IktpbWJlcmxleSIsInRlYW1JZCI6M30=",
  };

  await runTest({
    title: "Document API Call Module Test",
    api: api.document,
    id: "id",
    createOneTestData,
    updateTestData,
  });

  const data = [
    {
      documentName: "Award_" + timeStamp(),
      documentDescription: "Best CEO award",
      empId: 1,
      dateUploaded: new Date(),
      documentFile:
        "eyJlbXBJZCI6NTksImZpcnN0TmFtZSI6IklhaW4iLCJMYXN0TmFtZSI6IlllcnJpbmd0b24iLCJwcmVmZXJyZWROYW1lIjoiSWFpbiIsImdlbmRlciI6Ik1hbGUiLCJlbWFpbCI6ImlhaW4ueWVycmluZ3RvbkBibHVld2F2ZWxhYnMuY2EiLCJwaG9uZU51bWJlciI6IjU4NzczOTM3MTgiLCJuYXRpb25hbGl0eSI6IkRvbWluaWNhbiBSZXB1YmxpYyIsIm1hcml0YWxTdGF0dXMiOiJXaWRvd2VkIiwiYWRkcmVzc0lkIjoyOSwiaGlyZURhdGUiOiIyMDE5LTEwLTI5VDE0OjM4OjE0LjEyNVoiLCJyb2xlSWQiOjMsInNhbGFyeSI6MTA1NDgsImRlcGFydG1lbnRJZCI6MSwibWFuYWdlcklkIjo1MywiZW1wbG95bWVudFR5cGUiOiJFbXBsb3ltZW50IG9uIGNvbW1pc3Npb24iLCJjb21wZW5zYXRpb25UeXBlIjoiQm9udXNlcyIsImNvbXBlbnNhdGlvbiI6IkJpLXdlZWtseSIsIndlZWtseUhvdXJzIjozNCwib2ZmaWNlTG9jYXRpb24iOiJXYWxudXQgR3JvdmUiLCJ0ZWFtSWQiOjF9",
    },
    {
      documentName: "Certificate_" + timeStamp(),
      documentDescription: "Ph.D cert",
      empId: 1,
      dateUploaded: "2013-07-05T12:05:11.412Z",
      documentFile:
        "eyJlbXBJZCI6NzUsImZpcnN0TmFtZSI6IkFibmVyIiwiTGFzdE5hbWUiOiJDdW5kZXkiLCJwcmVmZXJyZWROYW1lIjoiQWJuZXIiLCJnZW5kZXIiOiJNYWxlIiwiZW1haWwiOiJhYm5lci5jdW5kZXlAYmx1ZXdhdmVsYWJzLmNhIiwicGhvbmVOdW1iZXIiOiI2MTM2MTIyNDY4IiwibmF0aW9uYWxpdHkiOiJIdW5nYXJ5IiwibWFyaXRhbFN0YXR1cyI6IlNlcGFyYXRlZCIsImFkZHJlc3NJZCI6OTMsImhpcmVEYXRlIjoiMjAxMy0wNy0wNVQxMjowNToxMS40MTJaIiwicm9sZUlkIjoxNSwic2FsYXJ5Ijo3NDYwLCJkZXBhcnRtZW50SWQiOjEwLCJtYW5hZ2VySWQiOjM4LCJlbXBsb3ltZW50VHlwZSI6IkludGVybnNoaXAiLCJjb21wZW5zYXRpb25UeXBlIjoiVG90YWwgY29tcGVuc2F0aW9uIiwiY29tcGVuc2F0aW9uIjoiQmktd2Vla2x5Iiwid2Vla2x5SG91cnMiOjIzLCJvZmZpY2VMb2NhdGlvbiI6IktpbWJlcmxleSIsInRlYW1JZCI6M30=",
    },
  ];

  // Test 6
  try {
    const res = await api.document.createMany(data);
    console.log("Test 6 - createMany", resultStatement(res));
  } catch (error) {
    console.log("Test 6 - createMany failed - error");
  }

  console.log("Document API Call Module Test completed");
};

const runEmployeeTests = async () => {
  console.log("Employee API Call Module Test");
  // Test 1:
  try {
    const employees = await api.employee.fetchAll();
    console.log("Test 1 - fetchAll", resultStatement(employees.length > 0));
  } catch (err) {
    console.log("Test 1 - fetchAll failed - error");
  }

  // Test 2
  try {
    const employee = await api.employee.fetchOne(1);
    console.log("Test 2 - fetchOne", resultStatement(employee.empId === 1));
  } catch (error) {
    console.log("Test 2 - fetchOne failed - error");
  }

  // Test 3
  try {
    const res = await api.employee.fetchOneByEmail(
      "leigh.kaines@bluewavelabs.ca"
    );

    console.log(
      "Test 3 - fetchOneByEmail",
      resultStatement(res.email === "leigh.kaines@bluewavelabs.ca")
    );
  } catch (error) {
    console.log("Test 3 - fetchOneByEmail failed - error");
  }

  // Test 4
  try {
    const managers = await api.employee.fetchManagers();
    console.log("Test 4 - fetchManagers", resultStatement(managers.length > 0));
  } catch (error) {
    console.log("Test 4 - fetchManagers failed - error");
  }

  // Test 5
  try {
    // Unique email for each test
    newEmployee.email = `${newEmployee.firstName.toLowerCase()}.${newEmployee.lastName.toLowerCase()}_${timeStamp()}@bluewavelabs.ca`;
    const data = {
      inputs: newEmployee,
      frontendUrl: "url",
    };
    const res = await api.employee.createOne(data);
    if (res.errors) {
      throw res;
    }
    console.log("Test 5 createOne", resultStatement(res));
  } catch (error) {
    console.log("Test 5 createOne failed - error");
  }

  // Test 6
  try {
    const res = await api.employee.update(updateEmployee);
    console.log(
      "Test 6 update",
      resultStatement(res.user === "elwyn.ginnety@bluewavelabs.ca")
    );
  } catch (error) {
    console.log("Test 6 update failed - error");
  }

  // Test 7
  try {
    const data = {
      empId: 4,
      date: new Date(),
      terminationReason: "Personal",
      terminationNote: "Goodbye",
    };
    const res = await api.employee.remove(data);
    console.log(res);
    if (res.errors) {
      throw res;
    }
    console.log("Test 7 remove", resultStatement(true));
  } catch (error) {
    console.log("Test 7 remove failed - error");
  }

  // Test 8
  try {
    const team = await api.employee.fetchMyTeam(1);
    console.log("Test 8 fetchMyTeam", resultStatement(team.length > 0));
  } catch (error) {
    console.log(
      "Test 8 fetchMyTeam failed  - ",
      await api.employee.fetchMyTeam(1)
    );
  }
  // Test 9
  try {
    const res = await api.employee.fetchSummaryByDepartments();
    console.log(
      "Test 9 fetchSummaryByDepartments",
      resultStatement(res.length > 0)
    );
  } catch (error) {
    console.log("Test 9 fetchSummaryByDepartments failed - error");
  }

  // Test 10
  try {
    const res = await api.employee.fetchSummaryByJobTitles();
    console.log(
      "Test 10 fetchSummaryByJobTitles",
      resultStatement(res.length > 0)
    );
  } catch (error) {
    console.log("Test 10 fetchSummaryByJobTitles failed - error");
  }
  // Test 11
  try {
    const res = await api.employee.fetchSummaryByNationalities();
    console.log(
      "Test 11 fetchSummaryByNationality",
      resultStatement(res.length > 0)
    );
  } catch (error) {
    console.log("Test 11 fetchSummaryByNationality failed -  error");
  }

  // Test 12
  try {
    const res = await api.employee.fetchSummaryByLocations();
    console.log(
      "Test 12 fetchSummaryByLocation",
      resultStatement(res.length > 0)
    );
  } catch (error) {
    console.log("Test 12 fetchSummaryByLocation failed - error");
  }

  // Test 13
  try {
    const res = await api.employee.fetchDepartmentChartData();
    console.log(
      "Test 13 fetchDepartmentChartData",
      resultStatement(res.length > 0)
    );
  } catch (error) {
    console.log("Test 13 fetchDepartmentChartData failed - error");
  }
  // Test 14
  try {
    const res = await api.employee.fetchHeadCounts(2020);
    console.log("Test 14 fetchHeadCounts", resultStatement(res));
  } catch (error) {
    console.log("Test 14 fetchHeadCounts failed");
  }
  // Test 15
  try {
    const data = { destinationDepartmentId: 2, employeeEmpIds: [1, 2, 3] };
    const res = await api.employee.changeDepartments(data);
    console.log("Test 15 changeDepartments", resultStatement(res));
  } catch (error) {
    console.log("Test 15 changeDepartments failed - error");
  }
  // Test 16
  try {
    const data = { destinationRoleId: 3, employeeEmpIds: [1, 2, 3] };
    const res = await api.employee.changeJobs(data);
    console.log("Test 16 changeRole", resultStatement(res));
  } catch (error) {
    console.log("Test 16 changeRole failed - error");
  }
  console.log("Employee API Call Module Test completed");
};

const runRoleTests = async () => {
  const createOneTestData = {
    roleTitle: "Test Role_" + timeStamp(),
    minimumSalary: 25000,
    maximumSalary: 125000000,
  };

  const updateTestData = {
    roleId: 2,
    roleTitle: "Update test_" + timeStamp(),
    minimumSalary: 2025,
    maximumSalary: 9999,
  };
  await runTest({
    title: "Role API Call Module Test",
    api: api.role,
    id: "roleId",
    unique: "roleTitle",
    createOneTestData,
    updateTestData,
  });

  const data = [
    { roleTitle: "Actor_" + timeStamp() },
    { roleTitle: "Director_" + timeStamp() },
    { roleTitle: "Stunts_" + timeStamp() },
    { roleTitle: "Editor_" + timeStamp() },
    { roleTitle: "Auditor_" + timeStamp() },
  ];

  // Test 6
  try {
    const res = await api.role.createMany(data);
    console.log("Test 6 - createMany", resultStatement(res));
  } catch (error) {
    console.log("Test 6 - createMany failed - error");
  }

  // Test 7
  try {
    const res = await api.role.exists("Accountant");
    console.log("Test 7 - check", resultStatement(res));
  } catch (error) {
    console.log("Test 7 - check failed - error");
  }

  console.log("Role API Call Module Test completed");
};

const runTeamTests = async () => {
  const createOneTestData = {
    teamName: "Construction_" + timeStamp(),
    teamLeadId: 65,
    teamDescription:
      "et id donec ultrices tincidunt arcu non. Tortor vitae purus faucibus ornare",
  };

  const updateTestData = {
    id: 2,
    teamName: "Management_" + timeStamp(),
    teamLeadId: 99,
    teamDescription:
      "et id donec ultrices tincidunt arcu non. Tortor vitae purus faucibus ornare",
  };
  await runTest({
    title: "Team API Call Module Test",
    api: api.team,
    id: "id",
    createOneTestData,
    updateTestData,
  });
  console.log("Team API Call Module Test completed");
};

const runTimeOffHistoryTests = async () => {
  const createOneTestData = {
    startDate: new Date(),
    endDate: dayjs("2024-09-25"),
    hours: 22.5,
    note: "nd donec pretium. Dictum varius duis at consectetur lorem. Eget nulla facilisi etiam dignissim diam quis enim. Mauris pellent",
    empId: 20,
    timeOffId: 1,
    approvalAuthorityId: 9,
    requestDate: "2013-08-28T18:25:06.783Z",
    decisionDate: "2013-08-31T18:25:06.783Z",
    status: "Approved",
  };

  const updateTestData = {
    id: 6,
    startDate: "2022-05-21T11:30:40.956Z",
    endDate: "2022-05-22T11:30:40.956Z",
    hours: 7.5,
    note: "lentesque elit ullamcorper. Odio aenean sed adipiscing diam donec adipiscing tristique risus. Ipsum a arcu cursus vitae congu",
    empId: 34,
    timeOffId: 2,
    approvalAuthorityId: 53,
    requestDate: "2022-05-16T11:30:40.956Z",
    decisionDate: "2022-05-17T11:30:40.956Z",
    status: "Approved",
  };
  await runTest({
    title: "TimeOffHistory API Call Module Test",
    api: api.timeOffHistory,
    id: "id",
    createOneTestData,
    updateTestData,
  });
  // Test 6
  try {
    const res = await api.timeOffHistory.fetchAllByEmployee(1);
    console.log("Test 6 fetchAllByEmployee", resultStatement(res));
  } catch (error) {
    console.log("Test 6 fetchAllByEmployee failed - error", error);
  }
  console.log("TimeOffHistory API Call Module Test completed");
};

const runNotificationTests = async () => {
  const createOneTestData = {
    empId: 50,
    timeOffHistoryId: 34,
    subject: "New time off request",
    message:
      "Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day",
    recipientId: [1, 2, 3, 4, 5],
  };

  const updateTestData = {
    notificationId: 1,
    employeeEmpId: 79,
    status: "waiting",
  };
  await runTest({
    title: "Notification API Call Module Test",
    api: api.notification,
    id: "id",
    createOneTestData,
    updateTestData,
  });
  // Test 6
  try {
    const res = await api.notification.fetchAllByEmployee(1);
    console.log("Test 6 fetchAllByEmployee", resultStatement(res));
  } catch (error) {
    console.log("Test 6 fetchAllByEmployee failed - error", error);
  }
  console.log("Notification API Call Module Test completed");
};

const runSocialProfileTests = async () => {
  const createOneTestData = {
    mediumName: "Discord",
    empId: 1,
    profileUrl: "https://discord.com/tests_" + timeStamp(),
  };

  const updateTestData = {
    id: 2,
    mediumName: "Tiktok",
    empId: 1,
    profileUrl: "https://tiktok.com/eginnety_updated_" + timeStamp(),
  };
  await runTest({
    title: "SocialProfile API Call Module Test",
    api: api.socialProfile,
    id: "id",
    createOneTestData,
    updateTestData,
  });
  // Test 6
  const data = { empId: 2, profileUrl: "https://facebook.com/eginnety" };
  try {
    const res = await api.socialProfile.fetchOneByUrl(data);
    console.log("Test 6 fetchAllByEmployee", resultStatement(res));
  } catch (error) {
    console.log("Test 6 fetchAllByEmployee failed - error", error);
  }
  console.log("SocialProfile API Call Module Test completed");
};

const runPermissionTests = async () => {
  const createOneTestData = {
    type: "Guest_" + timeStamp(),
    description: "Guest role",
  };

  const updateTestData = {
    id: 2,
    type: "Manager",
    description: "Manager role_" + timeStamp(),
  };
  await runTest({
    title: "Permission API Call Module Test",
    api: api.permission,
    id: "id",
    createOneTestData,
    updateTestData,
  });
  console.log("Permission API Call Module Test completed");
};

const runReportToTests = async () => {
  const createOneTestData = {
    empId: 1,
    empMgrId: null,
    priority: 4,
  };

  const updateTestData = {
    id: 2,
    empId: 2,
    empMgrId: 65,
    priority: 5,
  };
  await runTest({
    title: "ReportTo API Call Module Test",
    api: api.reportTo,
    id: "id",
    createOneTestData,
    updateTestData,
  });
  console.log("ReportTo API Call Module Test completed");
};
const runTimeOffTests = async () => {
  const createOneTestData = {
    category: "Personal_" + timeStamp(),
    description: "Do what you like with it, it is yours",
  };

  const updateTestData = {
    id: 2,
    category: "Sick Leave",
    description: "Get well soon",
  };
  await runTest({
    title: "TimeOff API Call Module Test",
    api: api.timeOff,
    id: "id",
    createOneTestData,
    updateTestData,
  });
  console.log("TimeOff API Call Module Test completed");
};

const runChangeHistoryTests = async () => {
  const title = "HistoryChange API Call Module Test";
  const createOneTestData = {
    empId: 1,
    date: dayjs(),
    changeType: "Department Change_" + timeStamp(),
    changeFrom: "Human Resources_" + timeStamp(),
    changeTo: "Executive",
  };

  const updateTestData = {
    id: 2,
    empId: 2,
    date: new Date(),
    changeType: "Department Change",
    changeFrom: "Human Resources",
    changeTo: "Legal",
  };

  const data = {
    title,
    api: api.changeHistory,
    id: "id",
    createOneTestData,
    updateTestData,
  };
  runTest(data);
  console.log("Change History API Call Module Test completed");
};

const runEmployeeAnnualTimeOffTests = async () => {
  const title = "EmployeeAnnualTimeOff  API Call Module Test";
  const createOneTestData = {
    employeeEmpId: 1,
    timeOffId: 1,
    yearNumber: 2090,
    hoursAllowed: 180,
    cumulativeHoursTaken: 37.5,
  };

  const updateTestData = {
    id: 2,
    yearNumber: 2026,
    hoursAllowed: 180,
    cumulativeHoursTaken: 37.5,
  };

  const data = {
    title,
    api: api.employeeAnnualTimeOff,
    id: "id",
    createOneTestData,
    updateTestData,
  };
  runTest(data);
  console.log("EmployeeAnnualTimeOff API Call Module Test completed");
};

const runCompanyTests = async () => {
  //Create more company entity
  await api.company.createOne(companyTestData);
  await api.company.createOne(companyTestData);
  await api.company.createOne(companyTestData);
  const title = "Company API Call Module Test";
  const createOneTestData = companyTestData;
  const updateTestData = {
    id: 2,
    companyName: "Test update_" + timeStamp(),
    companyWebsite: "www.bluewavelabs.ca",
    administratorEmail: `test_elwyn.ginnety_${timeStamp()}@bluewavelabs.ca`,
    companyDomain: "bluewavelabs22",
  };

  const data = {
    title,
    api: api.company,
    id: "id",
    createOneTestData,
    updateTestData,
  };
  runTest(data);
  // Test 6
  try {
    const res = await api.company.fetchLogo();
    console.log("Test 6 fetchlogo", resultStatement(res));
  } catch (error) {
    console.log("Test 6 fetchlogo failed - error");
  }

  console.log("Company API Call Module Test completed");
};

export async function run() {
  console.log("FetchServices Unit Tests running...");
  console.log("Setting up the testing environment...");

  // Login to begin the test
  try {
    await api.authentication.login(loginCredentials);
    console.log("Authentication completed");
  } catch (error) {
    console.log("Authentication failed", error);
  }
  await runChangeHistoryTests();
  await runCompanyTests();
  await runDepartmentTests();
  await runDocumentTests();
  await runEmployeeAnnualTimeOffTests();
  await runEmployeeTests();
  await runNotificationTests();
  await runPermissionTests();
  await runReportToTests();
  await runRoleTests();
  await runSocialProfileTests();
  await runTeamTests();
  await runTimeOffHistoryTests();
  await runTimeOffTests();

  await api.authentication.logout();
  console.log("Authorization cancelled");
  console.log("Test Completed");
}

//Employee test data

// It is assumed that this user exists in the database and the password is correct
const loginCredentials = {
  email: "elwyn.ginnety@bluewavelabs.ca",
  password: "Password1!",
};

const updateEmployee = {
  empId: 1,
  firstName: "Jon",
  lastName: "Doe",
  preferredName: "JD",
  email: "elwyn.ginnety@bluewavelabs.ca",
};

const newEmployee = {
  firstName: "Jon",
  lastName: "Doe",
  preferredName: "jd",
  gender: "Female",
  nationality: "Panamanian",
  dateOfBirth: "1952-04-18T19:17:57.434Z",
  maritalStatus: "Divorced",
  email: "jon.doe@bluewavelabs.ca",
  phoneNumber: "6045767422",
  hireDate: "2014-12-30T05:03:51.578Z",
  roleId: 11,
  salary: 10122,
  managerId: 65,
  departmentId: 7,
  employmentType: "Leased employment",
  compensationType: "Salary & commission",
  effectiveDate: "2014-12-30T05:03:51.578Z",
  weeklyHours: 24,
  photo: null,
  officeLocation: "Walnut Grove",
  teamId: 2,
  emergencyContactName: "John Chin",
  emergencyContactRelationship: "Father",
  emergencyContactPhoneNumber: "5877332379",
  streetAddress: "00900 Oakridge Alley",
  unitSuite: "Apt 1765",
  city: "Stony Plain",
  country: "Canada",
  stateProvince: "Alberta",
  postalZipCode: "L5V 1E5",
  createdAt: "2024-07-20T02:58:07.776Z",
  updatedAt: "2024-07-20T02:58:07.776Z",
};

const companyTestData = {
  companyName: "BlueWave Labs_" + timeStamp(),
  companyWebsite: "www.bluewavelabs.ca",
  administratorEmail: `elwyn.ginnety_${timeStamp()}@bluewavelabs.ca`,
  companyDomain: "bluewavelabs",
  streetAddress: "00900 Oakridge Alley",
  unitSuite: "Apt 1765",
  postalZipCode: "L5V 1E5",
  city: "Stony Plain",
  country: "Canada",
  stateProvince: "Alberta",
  facebookUrl: "https://facebook.com/bluewavelabs",
  twitterUrl: "https://twitter.com/bluewavelabs",
  linkedinUrl: "http://linkedin.com/in/bluewavelabs",
};
