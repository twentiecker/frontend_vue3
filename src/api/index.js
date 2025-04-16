import axios from "axios";

// Buat instance Axios dengan konfigurasi default
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ambil dari .env
  headers: {
    "Content-Type": "application/json",
  },
});

// // Interceptor Request: Tambahkan token jika ada
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Ambil token dari localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Interceptor Response: Tangani error global
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.error("Unauthorized! Redirecting to login...");
//       window.location.href = "/login"; // Redirect jika token expired
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
