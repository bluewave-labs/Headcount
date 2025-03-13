import axios from "axios";
const BASE_URL = require("./BaseUrl.json").value;
const addCred = require("./withCredentials.json");

export const fetchAll = async () => {
  try {
    const url = `${BASE_URL}/api/appusers`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchOne = async (userId) => {
  try {
    const url = `${BASE_URL}/api/appusers/${userId}`;
    const res = await axios.post(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createOne = async (data) => {
  try {
    const url = `${BASE_URL}/api/appusers`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
// Expected data format
//{
//   "id": 5,
//  "permissionId": 1,
//   "access": "Revoked"
// }
export const update = async (data) => {
  try {
    const url = `${BASE_URL}/api/appusers`;
    const res = await axios.put(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
// expected data format
// [
//   {
//     "id": 5,
//     "empId": 20,
//     "permissionId": 1,
//     "access": "Revoked"
// },
// {
//   "id": 5,
//   "empId": 20,
//   "permissionId": 1,
//   "access": "Revoked"
// }
// ]
export const updateMany = async (data) => {
  try {
    const url = `${BASE_URL}/api/appusers/update/bulk`;
    const res = await axios.put(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const remove = async (userId) => {
  try {
    const url = `${BASE_URL}/api/appusers/${userId}`;
    const res = await axios.delete(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const exists = async () => {
  try {
    const url = `${BASE_URL}/api/appusers/find/init/check`;
    const res = await axios.post(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchOneByEmail = async (email) => {
  try {
    const url = `${BASE_URL}/api/appusers/find/email`;
    const res = await axios.post(url, { email: email }, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const fetchOneByToken = async (token) => {
  try {
    const url = `${BASE_URL}/api/appusers/find/token`;
    const res = await axios.post(url, { token: token }, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const refresh = async () => {
  try {
    const url = `${BASE_URL}/api/appusers/refresh`;
    const res = await axios.get(url, addCred);
    // console.log("refresh data:", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
