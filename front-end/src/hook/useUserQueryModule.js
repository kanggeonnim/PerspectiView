import { useAuthStore } from "@/store/auth/useAuthStore";
import { formApi, privateApi } from "@/util/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useUserQueryModule = () => {
  const { user, setUser } = useAuthStore();
  const queryClient = useQueryClient();
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

  // 수정
  const { mutate: updateUserInfo } = useMutation({
    mutationFn: async (newData) => {
      const formData = new FormData();
      const json = JSON.stringify(newData.userRequestDto);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("userRequestDto", blob);
      formData.append("uploadImage", newData.uploadImage);
      const response = await formApi.put(`/api/user`, formData);
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
