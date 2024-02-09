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
      setUser(response.data.response); // zustand 상태 업데이트
      return response.data.response;
    },
    // enabled: redirected, // 리다이렉트로 이동한 경우에만 실행되도록 설정
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
