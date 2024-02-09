import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "@/util/api";

const usePlotQueryModule = (teamId, productId, plotId) => {
  const queryClient = useQueryClient();

  const { data: plotList, isSuccess: getPlotListIsSuccess } = useQuery({
    queryKey: ["plotList"],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}/product/${productId}/plot`);
      console.log(response);
      return response.data.response;
    },
  });

  const { mutate: createPlot } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.post(
        `/api/team/${teamId}/product/${productId}/plot`,
        newData
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["plotList"] });
    },
  });

  const { mutate: updatePlot } = useMutation({
    mutationFn: async (updatedData) => {
      const response = await privateApi.put(
        `/team/${teamId}/product/${productId}/plot/${plotId}`,
        updatedData
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["plotList"] });
    },
  });

  const { mutate: deletePlot } = useMutation({
    mutationFn: async () => {
      console.log(teamId, productId, plotId);
      const response = await privateApi.delete(
        `/team/${teamId}/product/${productId}/plot/${plotId}`
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["plotList"] });
    },
  });

  return { plotList, getPlotListIsSuccess, createPlot, updatePlot, deletePlot };
};

export default usePlotQueryModule;
