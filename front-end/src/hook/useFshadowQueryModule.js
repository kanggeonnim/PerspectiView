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
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTAxNjk2MzYyNjU1NTIyMzgyNDg1Iiwicm9sZSI6IltdIiwiaWF0IjoxNzA3MzA4MjQ2LCJleHAiOjE3MDczMDkxNDZ9.qvXxFoeuCMDrNZUgQ6iEjJTDDQ3cAp4J74Q8FHwP6x4`,
              // "Access-Control-Allow-Origin": "",
              // "Access-Control-Allow-Credentials": "true",
            },
            // withCredentials: true,
          }
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }

      // return response.data.response;
    },
    // queryFn: async () => {
    //   const response = await api.get(
    //     `/api/team/${teamId}/product/${productId}/foreshadowing`
    //   );
    //   console.log(response);
    //   return response.data.response;
    // },
  });

  // const { mutate: deleteBoardMutation } = useMutation(
  //   (team_id) => api.delete(`/api/team/${team_id}`),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("board_list");
  //     },
  //   }
  // );
  return { fshadowData, getFshadowIsSuccess };
};

export default useFshadowQueryModule;
