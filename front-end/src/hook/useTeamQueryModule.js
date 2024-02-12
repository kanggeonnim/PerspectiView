import { privateApi } from "@/util/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useTeamQueryModule = () => {
  const queryClient = useQueryClient();
  const { data: teamData, isSuccess: getTeamsIsSuccess } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team`);
      // console.log(response);
      return response.data.response;
    },
  });

  const { mutate: createTeam } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.post(`/api/team`, newData);
      console.log("팀생성", response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });
    },
  });

  return { teamData, getTeamsIsSuccess, createTeam };
};

export default useTeamQueryModule;
