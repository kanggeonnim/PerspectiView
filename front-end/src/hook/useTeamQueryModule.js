import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const useTeamQueryModule = () => {
  const { data: teamData, isSuccess: getTeamIsSuccess } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const response = await axios.get(`${VITE_BASE_URL}/api/team`);
      console.log(response);
      return response.data.response;
    },
  });

  return { teamData, getTeamIsSuccess };
};

export default useTeamQueryModule;
