import axios from "axios";
const BASE_URL = require("./BaseUrl.json").value; 
const addCred = require("./withCredentials.json");

export const fetchAll = async () => {
  try {
    const url = `${BASE_URL}/api/roles`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchOne = async (roleId) => {
  try {
    const url = `${BASE_URL}/api/roles/${roleId}`;
    const res = await axios.post(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createOne = async (data) => {
  try {
    const url = `${BASE_URL}/api/roles`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const update = async (data) => {
  try {
    const url = `${BASE_URL}/api/roles`;
    const res = await axios.put(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const remove = async (roleId) => {
  try {
    const url = `${BASE_URL}/api/roles/${roleId}`;
    const res = await axios.delete(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const exists = async (roleTitle) => {
    try {
      const url = `${BASE_URL}/api/roles/check/${roleTitle}`;
      const res = await axios.get(url, addCred);
      return res.data;
    } catch (err) {
      console.log(err);
      throw(err);
    }
  };
/**
 * 
 * @param {arry} roleData array of role object e.g. [{ roleTitle: "Actor"},{ roleTitle: "Director"}]
 * @returns role object or null
 */
  export const createMany = async (roleData) => {
    try {
      const url = `${BASE_URL}/api/roles/create/bulk`;
      const res = await axios.post(url, { data: roleData }, addCred);
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };