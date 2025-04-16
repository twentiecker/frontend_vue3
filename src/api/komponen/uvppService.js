import api from "../index";
import { API_ENDPOINTS } from "../../config/config";

const getUvpps = async (prefixList = []) => {
  try {
    const params = {};
    if (prefixList.length > 0) {
      params.komponen_prefix = prefixList;
    }
    const response = await api.get(API_ENDPOINTS.UVPPS, {
      params,
      paramsSerializer: (params) => new URLSearchParams(params).toString(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateUvpps = async (payload) => {
  try {
    const response = await api.put(API_ENDPOINTS.UVPPS, payload);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export default { getUvpps, updateUvpps };
