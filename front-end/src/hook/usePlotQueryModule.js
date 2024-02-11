import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "@/util/api";
import { usePlotListStore } from "@/store/plot/usePlotListStore";
import useNodeStore from "@/store/useNodeStore";

const usePlotQueryModule = (teamId, productId, plotId) => {
  const queryClient = useQueryClient();
  const { plotList, setPlotList } = usePlotListStore();
  const { nodes } = useNodeStore();

  const { mutate: createPlot } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.post(
        `/api/team/${teamId}/product/${productId}/plot`,
        newData
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      setPlotList(data); // setPlotList는 컴포넌트 내에서 상태를 업데이트하는 함수
    },
  });

  const { mutate: updatePlotColor } = useMutation({
    mutationFn: async (updatedData) => {
      console.log("update", updatedData, teamId, productId, plotId);
      const response = await privateApi.put(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/color`,
        updatedData
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["productData"] });
    },

    // onSuccess: (data) => {
    //   const updatedPlot = plotList.map((plot) => {
    //     if (plot.plotId === data.plotId) {
    //       return {
    //         ...plot, // 이전 요소 정보를 유지하고
    //         plotName: data.plotName, // plotName을 data의 plotName으로 업데이트
    //         plotColor: data.plotColor, // plotColor를 data의 plotColor로 업데이트
    //         stories: data.stories, // stories를 data의 stories로 업데이트
    //       };
    //     } else {
    //       return plot;
    //     }
    //   });

    //   // Invalidate and refetch
    //   console.log("success", updatedPlot);
    //   setPlotList(updatedPlot);
    //   // story plotcolor state 변경
    // },
  });

  const { mutate: deletePlot } = useMutation({
    mutationFn: async () => {
      console.log(teamId, productId, plotId);
      const response = await privateApi.delete(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}`
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      setPlotList(plotList.filter((plot) => plot.plotId !== plotId));
    },
  });

  return { createPlot, updatePlotColor, deletePlot };
};

export default usePlotQueryModule;
