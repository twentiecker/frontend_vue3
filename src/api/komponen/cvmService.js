import api from "../index";
import { API_ENDPOINTS } from "../../config/config";

const getCvms = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.CVMS);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getCvmByYearQuarter = async (periode) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.CVM}/${periode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateCvms = async (payload, rasio_ref_periode) => {
  try {
    const response = await api.put(
      `${API_ENDPOINTS.CVMS}/${rasio_ref_periode}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export default { getCvms, getCvmByYearQuarter, updateCvms };
