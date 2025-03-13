import axios from "axios";
const BASE_URL = require("./BaseUrl.json").value;
const addCred = require("./withCredentials.json");

export const fetchAll = async () => {
  try {
    const url = `${BASE_URL}/api/employees`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchTerminated = async () => {
  try {
    const url = `${BASE_URL}/api/terminated`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchOne = async (empId) => {
  try {
    const url = `${BASE_URL}/api/employees/${empId}`;
    const res = await axios.post(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * 
 * @param {*} data expected data format 
 *  {
      inputs: yourInputs,
      frontendUrl: url
    }
 * @returns employee object
 */

export const createOne = async (data) => {
  try {
    const url = `${BASE_URL}/api/employees`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const update = async (data) => {
  try {
    const url = `${BASE_URL}/api/employees`;
    const res = await axios.put(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
/**
 * 
 * @param {*} data expected data format
   {
     "empId": 3,
     "date": "2024-08-21T12:11:28.950Z",
     "terminationReason":"Personal",
     "terminationNote": "Goodbye"
 }
 * @returns 
 */
export const remove = async (data) => {
  try {
    const url = `${BASE_URL}/api/employees`;
    const res = await axios.delete(url, { data: data }, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchOneByEmail = async (email) => {
  try {
    const url = `${BASE_URL}/api/employees/find/email`;
    const res = await axios.post(url, { email: email }, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchManagers = async () => {
  try {
    const url = `${BASE_URL}/api/managers`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchMyTeam = async (managerId) => {
  try {
    const url = `${BASE_URL}/api/employees/find/myteam`;
    const res = await axios.post(url, { managerId: managerId }, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchSummaryByDepartments = async () => {
  try {
    const url = `${BASE_URL}/api/employees/summaries/departments`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchSummaryByJobTitles = async () => {
  try {
    const url = `${BASE_URL}/api/employees/summaries/jobtitles`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchSummaryByNationalities = async () => {
  try {
    const url = `${BASE_URL}/api/employees/summaries/nationalities`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchSummaryByLocations = async () => {
  try {
    const url = `${BASE_URL}/api/employees/summaries/locations`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchDepartmentChartData = async () => {
  try {
    const url = `${BASE_URL}/api/employees/summaries/departments/chartdata`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchHeadCounts = async (year) => {
  try {
    const url = `${BASE_URL}/api/employees/summaries/headcounts/${year}`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

//Expected data format = { destinationDepartmentId: 2,employeeEmpIds: [1,2,3]}
export const changeDepartments = async (data) => {
  try {
    const url = `${BASE_URL}/api/employees/change/department`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    throw err;
  }
};

//Expected data format = { destinationRoleId: 2, employeeEmpIds: [1,2,3]}
export const changeJobs = async (data) => {
  try {
    const url = `${BASE_URL}/api/employees/change/job`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    throw err;
  }
};


export const finalizeOnboarding = async (empId) => {
  try {
    const url = `${BASE_URL}/api/employees/onboarding/done`;
    const res = await axios.post(url, {empId: empId}, addCred);
    return res.data;
  } catch (err) {
    throw err;
  }

}

export const fetchEmployeeWithNoManager = async () => {
  try {
    const url = `${BASE_URL}/api/employees/manager/none`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    throw err;
  }
};

//Expected data format = { managerIds: [1,2,3]}
export const removeManager = async (data) => {
  try {
    const url = `${BASE_URL}/api/employees/manager/remove`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    throw err;
  }
};

//Expected data format [{managerId:1, empIds: [2,3,4]}, {managerId: 5, empIds:[6,7,8]}]
export const changeManager = async (data) => {
  try {
    const url = `${BASE_URL}/api/employees/manager/change`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    throw err;
  }
};
