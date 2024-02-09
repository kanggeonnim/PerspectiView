import { privateApi } from "@/util/api";
import { useQuery } from "@tanstack/react-query";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

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

// import { privateApi } from "@/util/api";
// import { useQuery } from "@tanstack/react-query";
// const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

// const useFshadowQueryModule = (teamId, productId) => {
//   // const queryClient = useQueryClient();

//   const { data: fshadowData, isSuccess: getFshadowIsSuccess } = useQuery({
//     queryKey: ["foreshadowing", teamId, productId],
//     queryFn: async () => {
//       try {
//         const response = await privateApi.get(
//           `/api/team/${teamId}/product/${productId}/foreshadowing`
//         );
//         console.log("여기", response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     },
//   });

//   return { fshadowData, getFshadowIsSuccess };
// };

// export default useFshadowQueryModule;

