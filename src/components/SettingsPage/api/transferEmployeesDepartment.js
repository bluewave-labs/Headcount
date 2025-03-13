import { axios } from './axios';

export const transferEmployeesDepartment = async (data) => {
  try {
    const response = await axios.post(
      "employees/change/department",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error transfer employees:", error);
    throw error;
  }
};
