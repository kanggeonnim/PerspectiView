import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { privateApi } from "@/util/api";

const useTeamQueryModule = () => {
  const { data: teamData, isSuccess: getTeamIsSuccess } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team`);
      console.log(response);
      return response.data.response;
    },
  });

  return { teamData, getTeamIsSuccess };
};

export default useTeamQueryModule;
