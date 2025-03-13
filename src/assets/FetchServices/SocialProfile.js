import axios from "axios";
const BASE_URL = require("./BaseUrl.json").value;
const addCred = require("./withCredentials.json");

export const fetchAll = async () => {
  try {
    const url = `${BASE_URL}/api/socialprofiles`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchOne = async (teamId) => {
  try {
    const url = `${BASE_URL}/api/socialprofiles/${teamId}`;
    const res = await axios.post(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createOne = async (data) => {
  try {
    const url = `${BASE_URL}/api/socialprofiles`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const update = async (data) => {
  try {
    const url = `${BASE_URL}/api/socialprofiles`;
    const res = await axios.put(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const remove = async (empId) => {
  try {
    const url = `${BASE_URL}/api/socialprofiles/${empId}`;
    const res = await axios.delete(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 *
 * @param {*} data expected data format { empId: 2, profileUrl: url }
 * @returns
 */
export const fetchOneByUrl = async (data) => {
  try {
    const url = `${BASE_URL}/api/socialprofiles/find/url`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
