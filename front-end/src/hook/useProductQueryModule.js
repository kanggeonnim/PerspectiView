import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateApi, formApi } from "@/util/api";
import { usePlotListStore } from "@/store/plot/usePlotListStore";
import useNodeStore from "@/store/story/useNodeStore";
import { useProductStore } from "@/store/product/useProductStore";

const useProductQueryModule = (teamId, productId) => {
  const queryClient = useQueryClient();
  const { setProduct } = useProductStore();
  const { setPlotList } = usePlotListStore();
  const { setNodes, arrangeStory, addEmptyStory } = useNodeStore();

  const { data: productListData, isSuccess: getProductListDataIsSuccess } = useQuery({
    queryKey: ["productListData", teamId],
    queryFn: async () => {
      // console.log(teamId);
      const response = await privateApi.get(`/api/team/${teamId}/product`);
      return response.data.response;
    },
  });

  const { data: productData, isSuccess: getProductDataIsSuccess } = useQuery({
    queryKey: ["productData", productId],
    queryFn: async () => {
      // if (!product) {
      console.log("get product api call");
      const response = await privateApi.get(`/api/team/${teamId}/product/${productId}`);
      const product = response.data.response;

      setProduct(product);
      setPlotList(product.plots);
      setNodes([]);
      let idx = 0;

      product.plots.map((plot) => {
        // console.log(plot);
        if (plot.stories.length === 0) {
          addEmptyStory(idx++, plot.plotId, plot.plotColor);
        } else {
          plot.stories.map((story) => {
            arrangeStory(story, plot.plotId, idx++, plot.plotColor);
          });
        }
      });
      return response.data.response;
    },
    // return null;
    // },
  });

  const { mutate: createProductData } = useMutation({
    mutationFn: async (newData) => {
      const formData = new FormData();
      // formData.append('productRequestDto', JSON.stringify(newData.productRequestDto));
      const json = JSON.stringify(newData.productRequestDto);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("productRequestDto", blob);
      formData.append("uploadImage", newData.uploadImage);
      const response = await formApi.post(`/api/team/${teamId}/product`, formData);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["productListData"] });
    },
  });
  const { mutate: updateProductData } = useMutation({
    mutationFn: async (newData) => {
      const formData = new FormData();
      const json = JSON.stringify(newData.productRequestDto);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("productRequestDto", blob);
      formData.append("uploadImage", newData.uploadImage);
      console.log(formData)
      const response = await privateApi.put(`/api/team/${teamId}/product/${productId}`, formData);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["productListData"] });
    },
  });
  const { mutate: deleteProductData } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.delete(`/api/team/${teamId}/product/${productId}`, newData);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["productListData"] });
    },
  });
  return {
    productListData,
    getProductListDataIsSuccess,
    productData,
    getProductDataIsSuccess,
    createProductData,
    updateProductData,
    deleteProductData,
  };
};

export default useProductQueryModule;
