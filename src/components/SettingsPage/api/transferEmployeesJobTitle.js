import { axios } from './axios';

export const transferEmployeesJobTitle = async (data) => {
  try {
    const response = await axios.post(
      "employees/change/job",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error transfer employees:", error);
    throw error;
  }
};
