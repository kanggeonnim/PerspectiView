import { privateApi } from "@/util/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const useCharQueryModule = () => {
  const queryClient = useQueryClient();

  const { data: charData, isSuccess: getCharIsSuccess } = useQuery({
    queryKey: ["char", teamId],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}`);
      console.log(response);
      return response.data.response;
    },
  });

  return { charData, getCharIsSuccess };
};

export default useCharQueryModule;
