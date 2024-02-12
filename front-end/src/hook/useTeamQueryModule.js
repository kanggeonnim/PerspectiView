import { privateApi } from "@/util/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useTeamQueryModule = (teamId) => {
  const queryClient = useQueryClient();

  // 내 팀 조회
  const { data: teamData, isSuccess: getTeamsIsSuccess } = useQuery({
    queryKey: ["teamData"],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team`);
      // console.log(response);
      return response.data.response;
    },
  });

  //단일 팀 조회
  const { data: oneTeam, isSuccess: getOneTeamIsSuccess } = useQuery({
    queryKey: ["oneTeam", teamId],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}`);
      // console.log("단일 팀조회", response);
      return response.data.response;
    },
  });

  //팀 생성
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

  return {
    teamData,
    getTeamsIsSuccess,
    createTeam,
    oneTeam,
    getOneTeamIsSuccess,
  };
};

export default useTeamQueryModule;
