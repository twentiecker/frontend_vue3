import api from "../index";
import { API_ENDPOINTS } from "../../config/config";

const getUvppsSut = async (payload) => {
  try {
    const response = await api.get(API_ENDPOINTS.UVPPS_SUT, payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateUvppsSut = async (payload) => {
  try {
    const response = await api.put(API_ENDPOINTS.UVPPS_SUT, payload);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export default { getUvppsSut, updateUvppsSut };
