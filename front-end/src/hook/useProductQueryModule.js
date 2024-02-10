import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "@/util/api";
import { useProductStore } from "@/store/useProductStore";
import { usePlotListStore } from "@/store/plot/usePlotListStore";

const useProductQueryModule = (teamId, productId) => {
  const queryClient = useQueryClient();
  const { setProduct } = useProductStore();
  const { setPlotList } = usePlotListStore();

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
      setProduct(response.data.response);
      return response.data.response;
    },
  });

  const { mutate: createProduct } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.post(`/team/${teamId}/product`, newData);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["productList"] });
    },
  });
  const { mutate: updateProduct } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.put(`/team/${teamId}/product`, newData);
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
