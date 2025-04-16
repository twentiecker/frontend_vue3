import api from "../index";
import { API_ENDPOINTS } from "../../config/config";

// const addUpdateCp = async (payload) => {
//   try {
//     const response = await api.post(API_ENDPOINTS.ADD_UPDATE_CP, payload);
//     return response;
//   } catch (error) {
//     console.error("Error sending data:", error);
//     throw error;
//   }
// };

const getCps = async (prefixList = []) => {
  try {
    const params = {};
    if (prefixList.length > 0) {
      params.komponen_prefix = prefixList;
    }
    const response = await api.get(API_ENDPOINTS.CPS, {
      params,
      paramsSerializer: (params) => new URLSearchParams(params).toString(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateCps = async (payload) => {
  try {
    const response = await api.put(API_ENDPOINTS.CPS, payload);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export default { getCps, updateCps };
