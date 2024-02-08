import { privateApi } from "@/util/api";
import { useQuery } from "@tanstack/react-query";

const useUserQueryModule = () => {
  const { data: getUser, isSuccess: getUserIsSuccess } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const response = await privateApi.get(`/api/user`);
      console.log(response);
      return response.data.response;
    },
  });
  return { getUser, getUserIsSuccess };
};

export default useUserQueryModule;
