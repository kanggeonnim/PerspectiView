import { useQuery } from "@tanstack/react-query";
import { privateApi } from "@/util/api";
import { getCookie } from "@/util/cookie";

const useTeamQueryModule = () => {
  const { data: teamData, isSuccess: getTeamIsSuccess } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      console.log(getCookie("token"));
      const response = await privateApi.get(`/api/team`);
      // console.log(response);
      return response.data.response;
    },
  });

  return { teamData, getTeamIsSuccess };
};

export default useTeamQueryModule;
