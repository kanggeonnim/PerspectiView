import { useFshadow } from "@/store/useFshadow";
import { privateApi } from "@/util/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

//복선 전체 조회 & useFshadow에 반영
const useFshadowQueryModule = (teamId, productId) => {
  const queryClient = useQueryClient();

  const { fshadows, setFshadows } = useFshadow();

  const { data: fshadowList, isSuccess: getFshadowIsSuccess } = useQuery({
    queryKey: ["foreshadowing", teamId, productId],
    queryFn: async () => {
      const response = await privateApi.get(
        `/api/team/${teamId}/product/${productId}/foreshadowing`
      );
      return response.data.response;
    },
  });
  //TODO 여기서 쓰는 거 맞는 지 확인
  useEffect(() => {
    if (getFshadowIsSuccess) {
      setFshadows(fshadowList);
    }
  }, [getFshadowIsSuccess, fshadowList, setFshadows]);

  //post
  const { mutate: createFshadow } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.post(
        `/api/team/${teamId}/product/${productId}/foreshadowing`,
        newData
      );
      console.log("복선생성", response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["foreshadowing", teamId, productId],
      });
    },
  });

  return { fshadowList, getFshadowIsSuccess, createFshadow };
};

export default useFshadowQueryModule;
