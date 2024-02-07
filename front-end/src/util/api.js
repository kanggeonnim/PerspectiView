// // api.js
// import axios from "axios";

// const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
// const token = "";
// const api = axios.create({
//   baseURL: VITE_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   // withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem("token");
//   config.headers.Authorization = `Bearer ${token}`;

//   return config;
// });
// export default api;
