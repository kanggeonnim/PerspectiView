import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "@/util/api";

const useProductQueryModule = (teamId) => {
  const queryClient = useQueryClient();


  const { data: productData, isSuccess: getProductIsSuccess } = useQuery({
    queryKey: ["product", teamId],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}/product`);
      console.log(response);
      return response.data.response;
    },
  });

  const { mutate: createProduct } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.post(`/team/${teamId}/product`, 
      {   
        "productTitle": "create Testa",
        "productInfo": "string!",
        "category": {
          "id": 1,
          "name": "웹소설"
        },
        "genres": [
          {
            "id":2,
            "name": "액션"
          }
        ]
      ,
      "uploadImage": "https://img6.yna.co.kr/etc/inner/KR/2021/06/12/AKR20210612027700009_02_i_P4.jpg"
    });
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["plotList"] });
    },
  });


  return { productData, getProductIsSuccess, createProduct };
};

export default useProductQueryModule;
