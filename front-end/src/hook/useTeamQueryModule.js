import axios from "axios";
import api from "@/util/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useTeamQueryModule = () => {
  const queryClient = useQueryClient();

  const { data: teamData, isSuccess: getTeamIsSuccess } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const response = await api.get("/api/team");
      console.log(response);
      return response.data.response;
    },  
  });

  // const { mutate: deleteBoardMutation } = useMutation(
  //   (team_id) => api.delete(`/api/team/${team_id}`),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("board_list");
  //     },
  //   }
  // );
  return { teamData, getTeamIsSuccess };
};

export default useTeamQueryModule;
