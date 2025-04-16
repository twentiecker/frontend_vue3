import api from "../index";
import { API_ENDPOINTS } from "../../config/config";

const getCvmsSut = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.CVMS_SUT);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getCvmSutByYearQuarter = async (periode) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.CVM_SUT}/${periode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateCvmsSut = async (payload, rasio_ref_periode) => {
  try {
    const response = await api.put(
      `${API_ENDPOINTS.CVMS_SUT}/${rasio_ref_periode}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export default { getCvmsSut, getCvmSutByYearQuarter, updateCvmsSut };
