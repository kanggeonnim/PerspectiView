import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "@/util/api";
import { usePlotListStore } from "@/store/plot/usePlotListStore";
import useNodeStore from "@/store/story/useNodeStore";

const usePlotQueryModule = (teamId, productId, plotId) => {
  const queryClient = useQueryClient();
  const { plotList, setPlotList } = usePlotListStore();
  const { nodes, setNodes, addEmptyStory } = useNodeStore();

  const { mutate: createPlot } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.post(
        `/api/team/${teamId}/product/${productId}/plot`,
        newData
      );
      return response.data.response;
    },
    onSuccess: (data) => {
      plotList.push({
        plotId: data.id,
        plotName: data.plotName,
        plotColor: data.plotColor,
        stories: [],
      });
      setPlotList(plotList);
      addEmptyStory(nodes.length, data.plotId, data.plotColor);
    },
  });

  const { mutate: updatePlotColor } = useMutation({
    mutationFn: async (updatedData) => {
      const response = await privateApi.put(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/color`,
        updatedData
      );
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["productData"] });
    },
  });

  const { mutate: deletePlot } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.delete(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}`
      );
      return response.data.response;
    },
    onSuccess: () => {
      setPlotList(plotList.filter((plot) => plot.plotId !== plotId));
      setNodes(nodes.filter((node) => node.data.plotId !== plotId));
    },
  });

  return { createPlot, updatePlotColor, deletePlot };
};

export default usePlotQueryModule;
