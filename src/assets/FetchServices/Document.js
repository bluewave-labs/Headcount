import axios from "axios";
const BASE_URL = require("./BaseUrl.json").value; 
const addCred = require("./withCredentials.json");

export const fetchAll = async () => {
  try {
    const url = `${BASE_URL}/api/documents`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchOne = async (id) => {
  try {
    const url = `${BASE_URL}/api/documents/${id}`;
    const res = await axios.post(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createOne = async (data) => {
  try {
    const url = `${BASE_URL}/api/documents`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createOneWithProgressReport = async (data, func) => {
  try {
    const url = `${BASE_URL}/api/documents`;
    const res = await axios.post(
      url,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          func(percentCompleted);
        },
        ...addCred,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const update = async (data) => {
  try {
    const url = `${BASE_URL}/api/documents`;
    const res = await axios.put(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const remove = async (id) => {
  try {
    const url = `${BASE_URL}/api/documents/${id}`;
    const res = await axios.delete(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createMany = async (data) => {
    try {
      const url = `${BASE_URL}/api/documents/create/bulk`;
      const res = await axios.post(url, { data: data }, addCred);
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
