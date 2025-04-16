import api from "../index";
import { API_ENDPOINTS } from "../../config/config";

const getRasioRefsSut = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.RASIO_REFS_SUT);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getRasioRefSutByYearQuarter = async (periode) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.RASIO_REF_SUT}/${periode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateRasioRefsSut = async (payload) => {
  try {
    const response = await api.put(API_ENDPOINTS.RASIO_REFS_SUT, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export default {
  getRasioRefsSut,
  getRasioRefSutByYearQuarter,
  updateRasioRefsSut,
};
