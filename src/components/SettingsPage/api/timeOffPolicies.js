import { axios } from './axios';

const getTimeOffs = async () => {
  try {
    const response = await axios.get(`timeoffs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching timeoffs:", error);
    throw error;
  }
};

const createTimeOff = async (data) => {
  try {
    const response = await axios.post(
      `timeoffs`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error create new timeoff:", error);
    throw error;
  }
};

const editTimeOff = async (data) => {
  try {
    const response = await axios.put(
      `timeoffs`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error edit timeoff:", error);
    throw error;
  }
};

const deleteTimeOffInitiate = async (data) => {
  const { timeOffId, newTimeOffId } = data;
  try {
    const response = await axios.post(
      `timeoffs/deletion/initiate`,
      { timeOffId: timeOffId }
    );
    const { message } = response.data;
    const { timeOffId: oldTimeOffId, ...changedMessage } = message;

    const deleteData = {
      ...changedMessage,
      oldTimeOffId,
      newTimeOffId,
    };
    deleteTimeOffConfirm(deleteData);
  } catch (error) {
    console.error("Error delete timeoff:", error);
    throw error;
  }
};

const deleteTimeOffConfirm = async (data) => {
  try {
    const response = await axios.delete(
      "timeoffs/deletion/confirm/ ",
      { data }
    );
    return response.data;
  } catch (error) {
    console.error("Error delete timeoff:", error);
    throw error;
  }
};

const getRenewDateMonth = async () => {
  try {
    const response = await axios.get(
      "timeoffs/renewaldate/get"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching timeoff renew date:", error);
    throw error;
  }
};

const setRenewDateMonth = async (data) => {
  try {
    const response = await axios.post(
      "timeoffs/renewaldate/set",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error create new timeoff:", error);
    throw error;
  }
};

export const timeOffPoliciesApi = {
  create: createTimeOff,
  fetch: getTimeOffs,
  update: editTimeOff,
  delete: deleteTimeOffInitiate,
  getRenewDateMonth,
  setRenewDateMonth,
};
