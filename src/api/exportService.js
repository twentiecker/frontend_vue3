import api from "./index";
import { API_ENDPOINTS } from "../config/config";

const exportData = async (payload) => {
  try {
    const response = await api.post(API_ENDPOINTS.EXPORT, payload, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mengekspor data:", error);
    throw error;
  }
};

export default { exportData };
