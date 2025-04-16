import api from "../index";
import { API_ENDPOINTS } from "../../config/config";

const getUvucs = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.UVUCS);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getUvucByYearQuarter = async (periode) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.UVUC}/${periode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateUvucs = async (payload) => {
  try {
    const response = await api.put(API_ENDPOINTS.UVUCS, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export default { getUvucs, getUvucByYearQuarter, updateUvucs };
