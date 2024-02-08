import { privateApi } from "@/util/api";
import { useQuery } from "@tanstack/react-query";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const useFshadowQueryModule = (teamId, productId) => {
  // const queryClient = useQueryClient();

  const { data: fshadowData, isSuccess: getFshadowIsSuccess } = useQuery({
    queryKey: ["foreshadowing", teamId, productId],
    queryFn: async () => {
      try {
        const response = await privateApi.get(
          `/api/team/${teamId}/product/${productId}/foreshadowing`
        );
        console.log("여기", response.data);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return { fshadowData, getFshadowIsSuccess };
};

export default useFshadowQueryModule;
