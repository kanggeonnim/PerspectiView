import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "@/util/api";
import { useProductStore } from "@/store/useProductStore";
import { usePlotListStore } from "@/store/plot/usePlotListStore";
import useNodeStore from "@/store/useNodeStore";

const useProductQueryModule = (teamId, productId) => {
  const queryClient = useQueryClient();
  const { setProduct } = useProductStore();
  const { setPlotList } = usePlotListStore();
  const { setNodes, arrangeStory, addEmptyStory } = useNodeStore();

  const { data: productList, isSuccess: getProductListIsSuccess } = useQuery({
    queryKey: ["productList", teamId],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}/product`);
      return response.data.response;
    },
  });

  const { data: productData, isSuccess: getProductDataIsSuccess } = useQuery({
    queryKey: ["productData", teamId, productId],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}/product/${productId}`);
      const product = response.data.response;
      setProduct(product);
      setPlotList(product.plots);
      setNodes([]);
      let idx = 0;

      product.plots.map((plot) => {
        if (plot.stories.length === 0) {
          // console.log("empty", plot.stories, plot.plotId, plot.plotColor, idx++);
          addEmptyStory(idx++, plot.plotId, plot.plotColor);
        } else {
          plot.stories.map((story) => {
            arrangeStory(story, plot.plotId, idx++, plot.plotColor);
            // console.log("arrange", idx++);
          });
        }
      });
      return response.data.response;
    },
  });

  const { mutate: createProduct } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.post(`/api/team/${teamId}/product`, newData);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["productList"] });
    },
  });
  const { mutate: updateProduct } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.put(`/api/team/${teamId}/product`, newData);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["productList"] });
    },
  });

  return {
    productList,
    getProductListIsSuccess,
    productData,
    getProductDataIsSuccess,
    createProduct,
    updateProduct,
  };
};

export default useProductQueryModule;
