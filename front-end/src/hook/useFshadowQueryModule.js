import { useFshadow } from "@/store/useFshadow";
import { privateApi } from "@/util/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

//복선 전체 조회 & useFshadow에 반영
const useFshadowQueryModule = (teamId, productId, foreshadowingId) => {
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

  // put
  const { mutate: updateFshadow } = useMutation({
    mutationFn: async (updatedData) => {
      const response = await privateApi.put(
        `/api/team/${teamId}/product/${productId}/foreshadowing/${foreshadowingId}`,
        updatedData
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["foreshadowing", teamId, productId],
      });
    },
  });

  //delete
  const { mutate: deleteFshadow } = useMutation({
    mutationFn: async () => {
      console.log(teamId, productId, foreshadowingId);
      const response = await privateApi.delete(
        `/api/team/${teamId}/product/${productId}/foreshadowing/${foreshadowingId}`
      );
      console.log("복선삭제", response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["foreshadowing", teamId, productId],
      });
    },
  });

  return {
    fshadowList,
    getFshadowIsSuccess,
    createFshadow,
    deleteFshadow,
    updateFshadow,
  };
};

export default useFshadowQueryModule;
