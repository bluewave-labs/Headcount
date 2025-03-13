import { axios } from './axios';
const companyId = 1;
const getCompanyDetails = async () => {
  try {
    const response = await axios.post(
      `company/${companyId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching company:", error);
    throw error;
  }
};


export const companyApi = {
  fetch: getCompanyDetails,
}