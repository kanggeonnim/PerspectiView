import { useFshadow } from "@/store/useFshadow";
import { privateApi } from "@/util/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

//복선 전체 조회 & useFshadow에 반영
const useFshadowQueryModule = (teamId, productId) => {
  // const queryClient = useQueryClient();
  const { fshadows, setFshadows } = useFshadow();
  const { data: fshadowData, isSuccess: getFshadowIsSuccess } = useQuery({
    queryKey: ["foreshadowing", teamId, productId],
    queryFn: async () => {
      const response = await privateApi.get(
        `/api/team/${teamId}/product/${productId}/foreshadowing`
      );
      return response.data.response;
    },
  });
  useEffect(() => {
    if (getFshadowIsSuccess) {
      setFshadows(fshadowData);
    }
  }, [getFshadowIsSuccess, fshadowData, setFshadows]);

  return { fshadowData, getFshadowIsSuccess };
};

export default useFshadowQueryModule;
