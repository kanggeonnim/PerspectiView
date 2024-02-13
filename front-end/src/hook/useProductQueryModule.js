import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateApi, formApi, publicApi } from "@/util/api";
import { useProductStore } from "@/store/useProductStore";
import { usePlotListStore } from "@/store/plot/usePlotListStore";
import useNodeStore from "@/store/useNodeStore";

const useProductQueryModule = (teamId, productId) => {
  const queryClient = useQueryClient();
  const { setProduct } = useProductStore();
  const { setPlotList } = usePlotListStore();
  const { setNodes, arrangeStory, addEmptyStory } = useNodeStore();

  const { data: productListData, isSuccess: getProductListDataIsSuccess } =
    useQuery({
      queryKey: ["productListData", teamId],
      queryFn: async () => {
        console.log(teamId);
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
          addEmptyStory(idx++, plot.plotId, plot.plotColor);
        } else {
          plot.stories.map((story) => {
            arrangeStory(story, plot.plotId, idx++, plot.plotColor);
          });
        }
      });
      return response.data.response;
    },
  });

  const { mutate: createProductData } = useMutation({
    mutationFn: async (newData) => {
      const formData = new FormData();
      // formData.append('productRequestDto', JSON.stringify(newData.productRequestDto));
      const json = JSON.stringify(newData.productRequestDto);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("productRequestDto", blob);
      formData.append("uploadImage", newData.uploadImage);
      const response = await formApi.post(
        `/api/team/${teamId}/product`,
        formData,
        {
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // },
        }
      );
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["productListData"] });
    },
  });
  const { mutate: updateProductData } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.put(
        `/api/team/${teamId}/product`,
        newData
      );
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
  };
};

export default useProductQueryModule;
