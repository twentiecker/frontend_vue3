import api from "../index";
import { API_ENDPOINTS } from "../../config/config";

const getUichs = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.UICHS);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getUichByYearQuarter = async (periode) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.UICH}/${periode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateUichs = async (payload) => {
  try {
    const response = await api.put(API_ENDPOINTS.UICHS, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export default { getUichs, getUichByYearQuarter, updateUichs };
