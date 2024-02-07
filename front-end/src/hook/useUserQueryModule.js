import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const useUserQueryModule = () => {
  const token = sessionStorage.getItem("token");
  console.log("token", token);
  const { data: getUser, isSuccess: getUserIsSuccess } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const response = await axios.get(`${VITE_BASE_URL}/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://localhost:5173",
          "Access-Control-Allow-Credentials": true,
        },
        // withCredentials: true,
      });
      console.log(response);
      return response.data.response;
    },
  });
  return { getUser, getUserIsSuccess };
};

export default useUserQueryModule;
