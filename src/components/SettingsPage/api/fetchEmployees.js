import { axios } from './axios';
export const fetchEmployees = async () => {
  try {
    const response = await axios.get("employees");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
