import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { privateApi } from "@/util/api";

const useTeamQueryModule = () => {
  const { data: teams, isSuccess: getTeamsIsSuccess } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team`);
      console.log(response);
      return response.data.response;
    },
  });

  return { teams, getTeamsIsSuccess };
};

export default useTeamQueryModule;
