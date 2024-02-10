import { useAuthStore } from "@/store/useAuthStore";
import { privateApi } from "@/util/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useUserQueryModule = () => {
  const { setUser } = useAuthStore();

  const { data: getUser, isSuccess: getUserIsSuccess } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const response = await privateApi.get(`/api/user`);
      setUser(response.data.response); // setPlotList는 컴포넌트 내에서 상태를 업데이트하는 함수
      return response.data.response;
    },
  });

  // getUser 데이터가 변경될 때마다 useEffect를 사용하여 상태를 업데이트합니다.
  useEffect(() => {
    if (getUser) {
      setUser(getUser);
    }
  }, [getUser, setUser]);
  return { getUser, getUserIsSuccess };
};

export default useUserQueryModule;
