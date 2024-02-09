import { useQuery } from "@tanstack/react-query";
import { privateApi } from "@/util/api";

const useProductQueryModule = (teamId) => {
  const { data: productData, isSuccess: getProductIsSuccess } = useQuery({
    queryKey: ["product", teamId],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}/product`);
      console.log(response);
      return response.data.response;
    },
  });

  return { productData, getProductIsSuccess };
};

export default useProductQueryModule;
