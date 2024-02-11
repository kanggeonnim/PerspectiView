import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "@/util/api";
import { usePlotListStore } from "@/store/plot/usePlotListStore";
import useNodeStore from "@/store/useNodeStore";

const useStoryQueryModule = (teamId, productId, plotId, storyId) => {
  const queryClient = useQueryClient();
  const { plotList, setPlotList } = usePlotListStore();
  const { nodes } = useNodeStore();
  const { arrangeStory } = useNodeStore();

  const { mutate: createStory } = useMutation({
    // mutationFn: async (newData) => {
    //   const response = await privateApi.post(
    //     `/api/team/${teamId}/product/${productId}/plot/${plotId}/story`,
    //     newData
    //   );
    //   console.log(response);
    //   return response.data.response;
    // },
    onSuccess: (data) => {
      // Invalidate and refetch
      arrangeStory(data, plot.plotId, plot.plotColor);

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
  return { createStory, deleteStory, moveStory };
};

export default useStoryQueryModule;
