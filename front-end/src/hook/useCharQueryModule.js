import api from "@/util/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const useCharQueryModule = () => {
  const queryClient = useQueryClient();
  
  const { data: charData, isSuccess: getCharIsSuccess} = useQuery ({
    queryKey: ["char", teamId],
    queryFn: async () => {
      const response = await api.get(`${VITE_BASE_URL}/api/team/${teamId}`,
      {
        headers : { 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTEyMTY1ODc3Njg3MTk0MDM1MDU3Iiwicm9sZSI6Ilt7XCJpZFwiOjQsXCJyb2xlXCI6XCJST0xFX1VTRVJcIn1dIiwiaWF0IjoxNzA3MzEwMzAxLCJleHAiOjE3MDczMTEyMDF9.GO8zLk9WHCCiVARa18judF9ToHQU8v-2zsFPG1ia4CM`,
          },
          withCredentials: true,
        }
      })
      console.log(response)
      return response.data.response;
    }

  })




  return {charData, getCharIsSuccess};


}

export default useCharQueryModule;