import { usePlotListStore } from "@/store/plot/usePlotListStore";
import useNodeStore from "@/store/useNodeStore";
import { useProductStore } from "@/store/useProductStore";
import { useStoryDetailStore } from "@/store/useStoryDetailStore";
import { privateApi } from "@/util/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useStoryQueryModule = (teamId, productId, plotId, storyId) => {
  const queryClient = useQueryClient();
  const { plotList, setPlotList } = usePlotListStore();
  const { nodes, setNodes, addStory } = useNodeStore();
  const { product, setProduct } = useProductStore();
  const { storyDetail, setStoryDetail, storyFshadowList, setStoryFshadowList } =
    useStoryDetailStore();

  //스토리 단일 조회
  const {
    data: getStoryDetailData,
    isSuccess: getStoryDetailDataIsSuccess,
    isLoading: isStoryDetailDataLoading,
  } = useQuery({
    queryKey: ["eachStory", storyId],
    queryFn: async () => {
      const response = await privateApi.get(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}`
      );

      console.log("스토리단일조회", response);

      return response.data.response;
    },
    isSuccess: async (data) => {
      console.log("스토리단일조회 success", data);
      // setStoryDetail(response.data.response);
    },
    enabled: Boolean(storyId),
  });

  useEffect(() => {
    if (getStoryDetailDataIsSuccess) {
      setStoryDetail(getStoryDetailData);
    }
  }, [getStoryDetailDataIsSuccess, getStoryDetailData, setStoryDetail]);

  //스토리 연관 복선조회
  const { data: getStoryFshadowListData, isSuccess: getStoryFshadowListDataIsSuccess } = useQuery({
    queryKey: ["fshadowList"],
    queryFn: async () => {
      const response = await privateApi.get(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}/fshadowlist`
      );
      console.log("스토리 연관 복선조회", response);
      return response.data.response;
    },
    enabled: Boolean(storyId),
  });

  // useEffect(() => {
  //   if (getStoryFshadowListDataIsSuccess) {
  //     setStoryFshadowList(getStoryFshadowListData);
  //   }
  // }, [getStoryFshadowListDataIsSuccess, getStoryFshadowListData, setStoryFshadowList]);

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

      queryClient.invalidateQueries({ queryKey: ["productData"] });

      console.log(data);
      const borderColor = plotList.find((plot) => plot.plotId === plotId).borderColor;

      // setNodes([]);
      // let idx = 0;

      // product.plots.map((plot) => {
      //   if (plot.stories.length === 0) {
      //     // console.log("empty", plot.stories, plot.plotId, plot.plotColor, idx++);
      //     addEmptyStory(idx++, plot.plotId, plot.plotColor);
      //   } else {
      //     plot.stories.map((story) => {
      //       arrangeStory(story, plot.plotId, idx++, plot.plotColor);
      //       // console.log("arrange", idx++);
      //     });
      //   }
      // });

      //
      //
      // addStory({
      //   id: data.positionX,
      //   type: "story",
      //   data: {
      //     title: data.storyTitle,
      //     borderColor: borderColor,
      //     plotId: plotId,
      //     storyId: data.storyId,
      //     characters: data.characters,
      //   },
      //   position: { x: data.positionX, y: data.positionY },
      //   positionAbsolute: { x: data.positionX, y: data.positionY },
      //   width: 128,
      //   height: 160,
      //   selected: false,
      //   dragging: false,
      // });
    },
  });

  const { mutate: updateStory } = useMutation({
    mutationFn: async (updatedData) => {
      console.log(updatedData);
      const response = await privateApi.put(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}`,
        updatedData
      );
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["eachStory"] });
    },
  });

  const { mutate: deleteStory } = useMutation({
    mutationFn: async (storyId) => {
      const response = await privateApi.delete(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}`
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productData"] });
    },
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

  const { mutate: addCharacter } = useMutation({
    mutationFn: async (updatedData) => {
      const response = await privateApi.post(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}/character/${updatedData.characterId}`,
        updatedData
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["eachStory"] });
      queryClient.invalidateQueries({ queryKey: ["productData"] });
    },
  });

  const { mutate: removeCharacter } = useMutation({
    mutationFn: async (characterId) => {
      const response = await privateApi.delete(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}/character/${characterId}`
      );
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["eachStory"] });
    },
  });

  return {
    createStory,
    deleteStory,
    updateStory,
    moveStory,
    addCharacter,
    removeCharacter,
    getStoryDetailData,
    isStoryDetailDataLoading,
    getStoryDetailDataIsSuccess,
    getStoryFshadowListData,
    getStoryFshadowListDataIsSuccess,
  };
};

export default useStoryQueryModule;
