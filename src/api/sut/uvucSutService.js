import api from "../index";
import { API_ENDPOINTS } from "../../config/config";

const getUvucsSut = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.UVUCS_SUT);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getUvucSutByYearQuarter = async (periode) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.UVUC_SUT}/${periode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateUvucsSut = async (payload) => {
  try {
    const response = await api.put(API_ENDPOINTS.UVUCS_SUT, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export default { getUvucsSut, getUvucSutByYearQuarter, updateUvucsSut };
