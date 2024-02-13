import { useAuthStore } from "@/store/auth/useAuthStore";
import { privateApi } from "@/util/api";
import { useQuery } from "@tanstack/react-query";

const useUserQueryModule = () => {
  const { user, setUser } = useAuthStore();

  const { data: getUser, isSuccess: getUserIsSuccess } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      if (!user) {
        console.log("login api call");
        const response = await privateApi.get(`/api/user`);
        setUser(response.data.response); // setPlotList는 컴포넌트 내에서 상태를 업데이트하는 함수
        return response.data.response;
      }
      return null;
    },
  });

  return { getUser, getUserIsSuccess };
};

export default useUserQueryModule;
