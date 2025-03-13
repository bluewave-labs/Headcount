import axios from "axios";
const BASE_URL = require("../BaseUrl.json").value;
//const addCred = require("../withCredentials.json");
const addCred = {
  withCredentials: false,
};

export const fetchAll = async () => {
  try {
    const url = `${BASE_URL}/api/offboarding`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchOne = async (id) => {
  try {
    const url = `${BASE_URL}/api/offboarding/${id}`;
    const res = await axios.post(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

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

export const fetchOneByToken = async (token) => {
  try {
    const url = `${BASE_URL}/api/offboarding/find/token`;
    const res = await axios.post(url, { token: token }, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
//data format { empId, email, frontendUrl } 
export const createOne = async (data) => {
  try {
    const url = `${BASE_URL}/api/offboarding`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const update = async (data) => {
  try {
    const url = `${BASE_URL}/api/offboarding`;
    const res = await axios.put(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const submit = async (data) => {
  try {
    const url = `${BASE_URL}/api/offboarding/final/submit`;
    const res = await axios.post(url, data);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
