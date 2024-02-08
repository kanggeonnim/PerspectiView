import { useAuthStore } from "@/store/useAuthStore";
import { privateApi } from "@/util/api";
import { getCookie, setCookie } from "@/util/cookie";
import { useMutation, useQuery } from "@tanstack/react-query";

const useUserQueryModule = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const { login, error, isError } = useMutation({
    mutationFn: async () => {
      const accessToken = await getCookie("accessToken");

      console.log(accessToken);
      const response = await privateApi.get(`/api/user`);
      return response.data.response;
    },
    onSuccess: async () => {
      console.log("success");
      // const token = getCookie("accessToken");
      // setUser(user);
    },
  });
  return { login, error, isError };
  // const { data: getUser, isSuccess: getUserIsSuccess } = useQuery({
  //   queryKey: ["login"],
  //   queryFn: async () => {
  //     const response = await privateApi.get(`/api/user`);
  //     return response.data.response;
  //   },
  //   isSuccess: async() => {
  //     console.log("success");
  //     // const user = await
  //     // setUser(user);
  //   },
  // });
  // return { getUser, getUserIsSuccess };
};

export default useUserQueryModule;
