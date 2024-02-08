import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { privateApi } from "@/util/api";

const useProductQueryModule = () => {
  const { data: productData, isSuccess: getProductIsSuccess } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/3/product`);
      console.log(response);
      return response.data.response;
    },
  });
  
  return { productData, getProductIsSuccess };
};

// const usePostProductQueryModule = () => {
//   const { data: productPostData, isSuccess: postProductIsSuccess } = useQuery({
//     queryKey: ["product"],
//     queryFn: async () => {
//       const response = await publicApi.post(`/api/team/3/product`, {

//       });
//       console.log(response);
//       return response.data.response;
//     },
//   });

//   return { productPostData, postProductIsSuccess };
// };


export default useProductQueryModule;
