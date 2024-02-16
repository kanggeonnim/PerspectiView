import { useAuthStore } from "@/store/auth/useAuthStore";
import { useTeamListStore } from "@/store/team/useTeamListStore";
import { privateApi } from "@/util/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useTeamQueryModule = (teamId) => {
  const { user } = useAuthStore();
  const { teamList, setTeamList } = useTeamListStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 내 팀 조회
  const { data: teamListData, isSuccess: getTeamListsIsSuccess } = useQuery({
    queryKey: ["teamListData"],
    queryFn: async () => {
      console.log(teamList);
      // if (!teamList) {
      const response = await privateApi.get(`/api/team`);
      setTeamList(response.data.response);
      console.log(response);
      return response.data.response;
    },
    // return null;
    // },
  });

  //단일 팀 조회
  const { data: oneTeam, isSuccess: getOneTeamIsSuccess } = useQuery({
    queryKey: ["oneTeam", teamId],
    queryFn: async () => {
      // console.log(team);
      const response = await privateApi.get(`/api/team/${teamId}`);
      console.log("단일 팀조회", response);
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
        queryKey: ["teamListData"],
      });
    },
  });

  // 팀 삭제
  const { mutate: deleteTeam } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.delete(`/api/team/${teamId}`);
      navigate(`/workspace/team/${user.personalTeamId}`);
      console.log("팀 삭제", response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["teamListData"],
      });
    },
  });

  // 팀 정보 수정
  const { mutate: updateTeamInfo } = useMutation({
    mutationFn: async (updatedData) => {
      const response = await privateApi.put(`/api/team/${teamId}`, updatedData);
      // console.log("팀정보수정", response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["oneTeam"],
      });
    },
  });

  //팀정보 페이지에서 팀원 추가
  const { mutate: addMember } = useMutation({
    mutationFn: async (email) => {
      const response = await privateApi.post(`/api/team/${teamId}/recruit`, email);
      console.log("멤버 추가", response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["oneTeam"],
      });
    },
  });

  return {
    teamListData,
    getTeamListsIsSuccess,
    createTeam,
    oneTeam,
    getOneTeamIsSuccess,
    addMember,
    deleteTeam,
    updateTeamInfo,
  };
};

export default useTeamQueryModule;
