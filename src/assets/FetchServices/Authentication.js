import axios from "axios";
const BASE_URL = require("./BaseUrl.json").value; 
const addCred = require("./withCredentials.json");

/**
 * logs in a potential user.
 * @param {*} loginCredentials  an object containing email and password properties.
 * @returns an object containing email address of the autheticated user.
 */
export const login = async (loginCredentials) => {
  const url = `${BASE_URL}/api/login`;
  try {
    const res = await axios.post(url, loginCredentials);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const signup = async (signupData) => {
  const url = `${BASE_URL}/api/signup`;
  try {
    const res = await axios.post(url, signupData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  const url = `${BASE_URL}/api/logout`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const forgotPassword = async (data) => {
  const url = `${BASE_URL}/api/forgotpassword`;
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const resetPassword = async (data, id) => {
  const url = `${BASE_URL}/api/resetpassword/${id}`;
  try {
    let res = await axios.patch(url, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const resetPasswordAuth = async (data) => {
  const url = `${BASE_URL}/api/resetPasswordauth`;
  try {
    let res = await axios.patch(url, data, addCred);
    return res.data;
  } catch (err) {
    throw err;
  }
};
