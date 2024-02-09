import { useAuthStore } from "@/store/useAuthStore";
import { privateApi } from "@/util/api";
import { useQuery } from "@tanstack/react-query";

const useUserQueryModule = () => {
  const { setUser } = useAuthStore();

  const { data: getUser, isSuccess: getUserIsSuccess } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const response = await privateApi.get(`/api/user`);
      console.log(response);
      setUser(response.data.response);
      return response.data.response;
    },
  });
  return { getUser, getUserIsSuccess };
};

export default useUserQueryModule;
