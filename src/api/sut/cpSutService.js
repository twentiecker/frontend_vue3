import api from "../index";
import { API_ENDPOINTS } from "../../config/config";

const getCpsSut = async (payload) => {
  try {
    const response = await api.get(API_ENDPOINTS.CPS_SUT, payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateCpsSut = async (payload) => {
  try {
    const response = await api.put(API_ENDPOINTS.CPS_SUT, payload);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export default { getCpsSut, updateCpsSut };
