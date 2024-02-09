import { useQuery } from "@tanstack/react-query";
import { privateApi } from "@/util/api";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const useProductQueryModule = (teamId) => {
  const { data: productData, isSuccess: getProductIsSuccess } = useQuery({
    queryKey: ["product", teamId],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}/product`, 
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     // 'Authorization' 헤더에 'Bearer 토큰값'을 설정
        //     Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTEyMTY1ODc3Njg3MTk0MDM1MDU3Iiwicm9sZSI6Ilt7XCJpZFwiOjMsXCJyb2xlXCI6XCJST0xFX1VTRVJcIn1dIiwiaWF0IjoxNzA3NDQ2OTM5LCJleHAiOjE3MDc0NTQxMzl9.oYO5LIfM3uk8GxfSmRG1tlvBVl5NG2Ty5l-MFlvNghE`,
        //   },
        //   withCredentials: true,
        
        // }
      );
      console.log(response);
      return response.data.response;
     }, 
  });
  
  return { productData, getProductIsSuccess };
};



export default useProductQueryModule;
