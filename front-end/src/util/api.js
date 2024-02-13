// api.js(지금 필요 없음)
import axios from "axios";
import { getCookie } from "./cookie";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

//토큰이 불필요한 경우
export const publicApi = axios.create({
  baseURL: VITE_BASE_URL,
});

//토큰을 함께 보내는 instance
export const privateApi = axios.create({
  baseURL: VITE_BASE_URL,
  //TODO 머지할떄 조심
  headers: {
    // Authorization: getCookie("accessToken"),
    Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTEyMTY1ODc3Njg3MTk0MDM1MDU3Iiwicm9sZSI6Ilt7XCJpZFwiOjMsXCJyb2xlXCI6XCJST0xFX1VTRVJcIn1dIiwiaWF0IjoxNzA3ODA1NDgxLCJleHAiOjE3MDc4MTI2ODF9.9VqXg6tkeq1nDqreFLZS1CiSTXetfu6GKl737dtpjXI",
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const formApi = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: getCookie("accessToken"),
    // Authorization:
    // "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTEyMTY1ODc3Njg3MTk0MDM1MDU3Iiwicm9sZSI6Ilt7XCJpZFwiOjMsXCJyb2xlXCI6XCJST0xFX1VTRVJcIn1dIiwiaWF0IjoxNzA3NzM3NTI1LCJleHAiOjE3MDc3NDQ3MjV9.rlMUxPDMGT0p_1IKcK4AomkYPjei_M08SxlEjcfnXJM",
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Credentials": true,
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
