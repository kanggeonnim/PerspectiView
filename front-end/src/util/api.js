// api.js(지금 필요 없음)
import axios from "axios";
import { getCookie, setCookie } from "./cookie";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

// const instance = axios.create({
//   baseURL: VITE_BASE_URL,
//   withCredentials: true,
// });

// instance.interceptors.request.use(
//   (config) => {
//     const accessToken = getCookie("token");

//     config.headers["Content-Type"] = "application/json";
//     config.headers["Authorization"] = accessToken;

//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
// }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const statusCode = error.response?.status;
//     if (statusCode === 401) {
//       error.response.statusText = "Unauthorized";
//       error.response.status = 401;
//       // navigate("/");
//     }
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     if (response.status === 404) {
//       console.log("404 페이지로 넘어가야 함!");
//     }

//     return response;
//   },
//   async (error) => {
//     if (error.response?.status === 401) {
//       if (isTokenExpired()) await tokenRefresh();

//       const accessToken = getToken();

//       error.config.headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       };

//       const response = await axios.request(error.config);
//       return response;
//     }
//     return Promise.reject(error);
//   }
// );

//토큰이 불필요한 경우
export const publicApi = axios.create({
  baseURL: VITE_BASE_URL,
});

//토큰을 함께 보내는 instance
export const privateApi = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    Authorization: getCookie("token"),
  },
});
// 리프레시토큰 요청 api
// function postRefreshToken() {
//   const response = publicApi.post("/api/token/refresh", {
//     accessToken: getCookie("token"),
//   });
//   return response;
// }
//
// //리프레시 토큰 구현
// privateApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;

//     if (status === 401) {
//       if (error.response.data.message === "Unauthorized") {
//         const originRequest = config;
//         try {
//           const tokenResponse = await postRefreshToken();
//           if (tokenResponse.status === 201) {
//             const newAccessToken = tokenResponse.data.token;
//             setCookie("token", tokenResponse.data.token);
//             setCookie("refreshToken", tokenResponse.data.refreshToken);
//             axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
//             originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//             return axios(originRequest);
//           }
//         } catch (error) {
//           if (axios.isAxiosError(error)) {
//             if (error.response?.status === 404 || error.response?.status === 422) {
//               console.log("LOGIN.MESSAGE.EXPIRED");
//               window.location.replace("/login");
//             } else {
//               console.log("LOGIN.MESSAGE.ETC");
//             }
//           }
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );
// export default instance;
