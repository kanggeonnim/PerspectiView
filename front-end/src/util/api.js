// api.js(지금 필요 없음)
import axios from "axios";

const api = axios.create({
  baseURL: "https://i10b310.p.ssafy.io",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYWthb18zMzMxMjE2NzA2Iiwicm9sZSI6IltdIiwiaWF0IjoxNzA3Mjk0Nzk4LCJleHAiOjE3MDcyOTU2OTh9.ujCG71xks2yj5AWUt7MozQXwp5uBZveFS6jfyfEtJI4",
  },
});

export default api;
