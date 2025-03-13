import axios from "axios";
const BASE_URL = require("../BaseUrl.json").value;
//const addCred = require("../withCredentials.json");
const addCred = {
  withCredentials: false,
};

export const fetchAll = async () => {
  try {
    const url = `${BASE_URL}/api/offboardingdoc`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchOne = async (id) => {
  try {
    const url = `${BASE_URL}/api/offboardingdoc/${id}`;
    const res = await axios.post(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createOne = async (data) => {
  try {
    const url = `${BASE_URL}/api/offboardingdoc`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const update = async (data) => {
  try {
    const url = `${BASE_URL}/api/offboardingdoc`;
    const res = await axios.put(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const remove = async (id) => {
  try {
    const url = `${BASE_URL}/api/offboardingdoc/${id}`;
    const res = await axios.delete(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const removeMany = async (data) => {
  try {
    const url = `${BASE_URL}/api/offboardingdoc/delete/bulk`;
    const res = await axios.delete(url, { data }, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createMany = async (data) => {
  try {
    const url = `${BASE_URL}/api/offboardingdoc/create/bulk`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const updateMany = async (data) => {
  try {
    const url = `${BASE_URL}/api/offboardingdoc/update/bulk`;
    const res = await axios.put(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
