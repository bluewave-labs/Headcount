import { axios } from './axios';

export const getEmployeesByDepartment = async () => {
  try {
    const response = await axios.get(
      "employees/summaries/departments"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};
