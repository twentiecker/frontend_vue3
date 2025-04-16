import api from "../index";
import { API_ENDPOINTS } from "../../config/config";

const getUichsSut = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.UICHS_SUT);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getUichSutByYearQuarter = async (periode) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.UICH_SUT}/${periode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateUichsSut = async (payload) => {
  try {
    const response = await api.put(API_ENDPOINTS.UICHS_SUT, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export default { getUichsSut, getUichSutByYearQuarter, updateUichsSut };
