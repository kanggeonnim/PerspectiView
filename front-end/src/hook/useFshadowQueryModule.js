import { useFshadow } from "@/store/useFshadow";
import { privateApi } from "@/util/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

//복선 전체 조회 & useFshadow에 반영
const useFshadowQueryModule = (
  teamId,
  productId,
  foreshadowingId,
  plotId,
  storyId
) => {
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

  // put(복선 타이틀,내용)
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

  //복선 사용(drop)
  const { mutate: dropFshadow } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.put(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}/fsStatus/${foreshadowingId}`
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

  //복선 사용취소(undrop)
  const { mutate: undropFshadow } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.delete(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}/fsStatus/${foreshadowingId}`
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

  //복선 회수
  const { mutate: closeFshadow } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.put(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}/fsClose/${foreshadowingId}`
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

  //복선 회수
  const { mutate: uncloseFshadow } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.delete(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}/fsClose/${foreshadowingId}`
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

  return {
    fshadowList,
    getFshadowIsSuccess,
    createFshadow,
    deleteFshadow,
    updateFshadow,
    dropFshadow,
    undropFshadow,
    closeFshadow,
    uncloseFshadow,
  };
};

export default useFshadowQueryModule;
