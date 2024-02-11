// api.js(지금 필요 없음)
import axios from "axios";
import { getCookie, setCookie } from "./cookie";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

//토큰이 불필요한 경우
export const publicApi = axios.create({
  baseURL: VITE_BASE_URL,
});

//토큰을 함께 보내는 instance
export const privateApi = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    Authorization: getCookie("accessToken"),
    // Authorization:
    // "Bearer+eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTAwOTQ1NTYyMzA3MDI0MDk1NDU0Iiwicm9sZSI6Ilt7XCJpZFwiOjEsXCJyb2xlXCI6XCJST0xFX1VTRVJcIn1dIiwiaWF0IjoxNzA3NDkzMDI1LCJleHAiOjE3MDc1MDAyMjV9.iF2Y5B7c7djlDq2O419O0AoK_OfWQRI8OlSH2fQGjpQ",
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
