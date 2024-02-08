import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/util/api";

const useTeamQueryModule = () => {
  const { data: teamData, isSuccess: getTeamIsSuccess } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const response = await publicApi.get(`/api/team`);
      // console.log(response);
      return response.data.response;
    },
  });

  return { teamData, getTeamIsSuccess };
};



export default useTeamQueryModule;
