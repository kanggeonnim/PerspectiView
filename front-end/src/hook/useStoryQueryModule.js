import { usePlotListStore } from "@/store/plot/usePlotListStore";
import useNodeStore from "@/store/useNodeStore";
import { useStoryDetail } from "@/store/useStoryDetailStore";
import { privateApi } from "@/util/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useStoryQueryModule = (teamId, productId, plotId, storyId) => {
  const queryClient = useQueryClient();
  const { plotList, setPlotList } = usePlotListStore();
  const { nodes, addStory } = useNodeStore();
  const { storyDetail, setStoryDetail, storyFshadowList, setStoryFshadowList } = useStoryDetail();

  //스토리 단일조회
  const { data: getStoryDetail, isSuccess: getStoryDetailIsSuccess } = useQuery({
    queryKey: ["eachStory"],
    queryFn: async () => {
      const response = await privateApi.get(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}`
      );
      console.log("스토리단일조회", response);
      return response.data.response;
    },
  });

  useEffect(() => {
    if (getStoryDetailIsSuccess) {
      setStoryDetail(getStoryDetail);
    }
  }, [getStoryDetailIsSuccess, getStoryDetail, setStoryDetail]);

  //스토리 연관 복선조회
  const { data: getStoryFshadowList, isSuccess: getStoryFshadowListIsSuccess } = useQuery({
    queryKey: ["fshadowList"],
    queryFn: async () => {
      const response = await privateApi.get(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}/fshadowlist`
      );
      console.log("스토리 연관 복선조회", response);
      return response.data.response;
    },
  });

  useEffect(() => {
    if (getStoryFshadowListIsSuccess) {
      setStoryFshadowList(getStoryFshadowList);
    }
  }, [getStoryFshadowListIsSuccess, getStoryFshadowList, setStoryFshadowList]);

  const { mutate: createStory } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.post(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story`,
        newData
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      // addStory(data, plot.plotId, plot.plotColor);
      // setPlotList(data); // setPlotList는 컴포넌트 내에서 상태를 업데이트하는 함수
    },
  });

  const { mutate: deleteStory } = useMutation({
    // mutationFn: async () => {
    //   console.log(teamId, productId, plotId);
    //   const response = await privateApi.delete(
    //     `/api/team/${teamId}/product/${productId}/plot/${plotId}`
    //   );
    //   console.log(response);
    //   return response.data.response;
    // },
    // onSuccess: () => {
    //   setPlotList(plotList.filter((plot) => plot.plotId !== plotId));
    // },
  });

  const { mutate: moveStory } = useMutation({
    mutationFn: async (newPosition, plotId) => {
      const response = await privateApi.put(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${newPosition.storyId}/vertical`,
        newPosition
      );
      return response.data.response;
    },
  });
  return {
    createStory,
    deleteStory,
    moveStory,
    getStoryDetail,
    getStoryDetailIsSuccess,
    getStoryFshadowList,
    getStoryFshadowListIsSuccess,
  };
};

export default useStoryQueryModule;
