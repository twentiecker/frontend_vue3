import api from "../index";
import { API_ENDPOINTS } from "../../config/config";

const getRasioRefs = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.RASIO_REFS);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getRasioRefByYearQuarter = async (periode) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.RASIO_REF}/${periode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateRasioRefs = async (payload) => {
  try {
    const response = await api.put(API_ENDPOINTS.RASIO_REFS, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export default { getRasioRefs, getRasioRefByYearQuarter, updateRasioRefs };
