import { privateApi } from "@/util/api";
import { useQuery } from "@tanstack/react-query";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const useTeamQueryModule = (teamId) => {
  const { data: teamData, isSuccess: getTeamIsSuccess } = useQuery({
    queryKey: ["team", teamId],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}`);
      console.log(response);
      return response.data.response;
    },
  });

  return { teamData, getTeamIsSuccess };
};



export default useTeamQueryModule;
