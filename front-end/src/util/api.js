// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://i10b310.p.ssafy.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
