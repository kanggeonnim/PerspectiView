import { privateApi } from "@/util/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const useCharQueryModule = () => {
  const queryClient = useQueryClient();

  const { data: charData, isSuccess: getCharIsSuccess } = useQuery({
    queryKey: ["char", teamId],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}`, {
        headers: {
          "Content-Type": "application/json",
          // 'Authorization' 헤더에 'Bearer 토큰값'을 설정
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTEyMTY1ODc3Njg3MTk0MDM1MDU3Iiwicm9sZSI6Ilt7XCJpZFwiOjMsXCJyb2xlXCI6XCJST0xFX1VTRVJcIn1dIiwiaWF0IjoxNzA3MzY2ODY2LCJleHAiOjE3MDczNjY5MjZ9.LUJq-04uLMW9XNVq0vErmsi2C_4M-ELKrJGBkqNe-u0`,
        },
        withCredentials: true,
      
      });
      console.log(response);
      return response.data.response;
    },
  });

  return { charData, getCharIsSuccess };
};

export default useCharQueryModule;
