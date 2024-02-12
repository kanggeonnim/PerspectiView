import { usePlotListStore } from "@/store/plot/usePlotListStore";
import useNodeStore from "@/store/useNodeStore";
import { useStoryDetail } from "@/store/useStoryDetailStore";
import { privateApi } from "@/util/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useStoryQueryModule = (teamId, productId, plotId, storyId) => {
  const queryClient = useQueryClient();
  const { plotList, setPlotList } = usePlotListStore();
  const { nodes, setNodes, addStory } = useNodeStore();
  const { storyDetail, setStoryDetail, storyFshadowList, setStoryFshadowList } = useStoryDetail();

  //스토리 단일조회
  const { data: getStoryDetail, isSuccess: getStoryDetailIsSuccess } = useQuery({
    queryKey: ["eachStory"],
    queryFn: async () => {
      const response = await privateApi.get(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}`
      );
      // console.log("스토리단일조회", response);
      setStoryDetail(response.data.response);
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
