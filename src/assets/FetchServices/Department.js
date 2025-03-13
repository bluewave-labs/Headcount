import axios from "axios";
const BASE_URL = require("./BaseUrl.json").value;
const addCred = require("./withCredentials.json");

/**
 * Makes API call to retrieve all departments in the database
 * @returns array of department objects or empty array if an error occur
 */
export const fetchAll = async () => {
  try {
    const url = `${BASE_URL}/api/departments`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * Makes API call to retrieve one department
 * @param {number} departmentId id of the department to be found
 * @returns department object or null if error no result or error occur
 */
export const fetchOne = async (departmentId) => {
  try {
    const url = `${BASE_URL}/api/departments/${departmentId}`;
    const res = await axios.post(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * Checks for the existence of a given department
 * @param {string} departmentName name of the department
 * @returns true if the department exists or false if otherwise
 */
export const exists = async (departmentName) => {
  try {
    const url = `${BASE_URL}/api/departments/check/${departmentName}`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
/**
 * Creates and saves a deparment into the database
 * @param {object} departmentData data of the department to be created
 * @returns department object
 */
export const createOne = async (departmentData) => {
  try {
    const url = `${BASE_URL}/api/departments`;
    const res = await axios.post(url, departmentData, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * Creates and saves several deparments into the database
 * @param {*} array of department data
 * @returns department object
 */
export const createMany = async (departmentData) => {
  try {
    const url = `${BASE_URL}/api/departments/create/bulk`;
    const res = await axios.post(url, { data: departmentData }, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
/**
 * Updates department record
 * @param {*} departmentData  updated data
 * @returns updated department object
 */
export const update = async (departmentData) => {
  try {
    const url = `${BASE_URL}/api/departments`;
    const res = await axios.put(url, departmentData, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
/**
 * Removes a department record from the database
 * @param {number} departmentId id of the department to be removed
 * @returns message indicating whether deletion occurred or not, or null if error occurs
 */
export const remove = async (departmentId) => {
  try {
    const url = `${BASE_URL}/api/departments/${departmentId}`;
    const res = await axios.delete(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
