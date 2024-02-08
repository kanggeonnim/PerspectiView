import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const useFshadowQueryModule = (teamId, productId) => {
  // const queryClient = useQueryClient();

  const { data: fshadowData, isSuccess: getFshadowIsSuccess } = useQuery({
    queryKey: ["foreshadowing", teamId, productId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}/api/team/${teamId}/product/${productId}/foreshadowing`,
          {
            headers: {
              "Content-Type": `application/json;charset=UTF-8`,
              Accept: "application/json",
              // 'Authorization' 헤더에 'Bearer 토큰값'을 설정
              Authorization: `Bearer 20eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYWthb18zMzMxMjE2NzA2Iiwicm9sZSI6IltdIiwiaWF0IjoxNzA3MzUzNTg1LCJleHAiOjE3MDczNTQ0ODV9.x4PWmC97pjz6Cp8Jl20JFNbw5jiiWFstJqcEcgsZ_J0`,
              // "Access-Control-Allow-Origin": "",
              // "Access-Control-Allow-Credentials": "true",
            },
            // withCredentials: true,
          }
        );
        console.log("여기", response.data);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return { fshadowData, getFshadowIsSuccess };
};

export default useFshadowQueryModule;
