import { useAuthStore } from "@/store/useAuthStore";
import { privateApi } from "@/util/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useUserQueryModule = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const { data: getUser, isSuccess: getUserIsSuccess } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const response = await privateApi.get(`/api/user`);
      setUser(response.data.response);
      return response.data.response;
    },
  });

  // getUser 데이터가 변경될 때마다 useEffect를 사용하여 상태를 업데이트합니다.
  useEffect(() => {
    if (getUser) {
      setUser(getUser);
    }
  }, [getUser, setUser]);

  // 수정
  const { mutate: updateUserInfo } = useMutation({
    mutationFn: async (updatedData) => {
      const response = await privateApi.put(`/api/user`, updatedData);
      console.log("회원정보수정", response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["login"],
      });
    },
  });

  //회원탈퇴
  const { mutate: deleteUser } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.delete(`/api/user`);
      // navigate(`/workspace`);
      console.log("회원 삭제 실행", response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["login"],
      });
    },
  });

  return { getUser, getUserIsSuccess, updateUserInfo, deleteUser };
};

export default useUserQueryModule;
