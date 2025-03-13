import axios from "axios";
const BASE_URL = require("./BaseUrl.json").value;
const addCred = require("./withCredentials.json");

export const fetchAll = async () => {
    try {
        const url = `${BASE_URL}/api/surveyresponses`;
        const res = await axios.get(url, addCred);
        return res.data;
    }
    catch (err) {
        console.log(err);
        return [];
    }
};

export const fetchOne = async (id) => {
    try {
        const url = `${BASE_URL}/api/surveyresponses/${id}`;
        const res = await axios.get(url, addCred);
        return res.data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
};

export const fetchAllByEmployeeId = async (empid) => {
    try {
        const url = `${BASE_URL}/api/surveyresponses/employee/${empid}`;
        const res = await axios.get(url, addCred);
        return res.data;
    }
    catch (err) {
        console.log(err);
        return [];
    }
};

export const fetchAllByOnboardingId = async (onboardingid) => {
    try {
        const url = `${BASE_URL}/api/surveyresponses/onboarding/${onboardingid}`;
        const res = await axios.get(url, addCred);
        return res.data;
    }
    catch (err) {
        console.log(err);
        return [];
    }
};

export const createOne = async (data) => {
    try {
        const url = `${BASE_URL}/api/surveyresponses`;
        const res = await axios.post(url, data, addCred);
        return res.data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
};

export const update = async (data) => {
    try {
        const url = `${BASE_URL}/api/surveyresponses`;
        const res = await axios.put(url, data, addCred);
        return res.data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
};

export const remove = async (id) => {
    try {
        const url = `${BASE_URL}/api/surveyresponses/${id}`;
        const res = await axios.delete(url, addCred);
        return res.data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
};