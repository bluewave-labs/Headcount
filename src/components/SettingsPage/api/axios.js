import globalAxios from 'axios';
const BASE_URL = require("../../../assets/FetchServices/BaseUrl.json").value;

console.log(BASE_URL);
export const axios = globalAxios.create({
  baseURL: `${BASE_URL}/api/`, // Base URL for all requests
});