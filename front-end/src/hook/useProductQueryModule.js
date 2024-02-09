import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "@/util/api";

const useProductQueryModule = (teamId) => {
  const queryClient = useQueryClient();

  const { data: productData, isSuccess: getProductIsSuccess } = useQuery({
    queryKey: ["productList", teamId],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}/product`);
      console.log(response);
      return response.data.response;
    },
  });
  const { mutate: createProduct } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.post(`/team/${teamId}/product`, newData);
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["productList"] });
    },
  });
  return { productData, getProductIsSuccess, createProduct };
};

export default useProductQueryModule;
