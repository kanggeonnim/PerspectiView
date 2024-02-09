import { privateApi } from "@/util/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const useCharQueryModule = () => {
  const queryClient = useQueryClient();

  const { data: charData, isSuccess: getCharIsSuccess } = useQuery({
    queryKey: ["char", teamId],
    queryFn: async () => {
      const response = await privateApi.get(`/team/${teamId}/product/${productId}/character`
      // ,{
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

  const { mutate: createChar } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.post(`/team/${teamId}/product/${productId}/character`, newData);
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["char"] });
    },
  });
  const { mutate: updateChar } = useMutation({
    mutationFn: async (updatedData) => {
      const response = await privateApi.put(
        `/team/${teamId}/product/${productId}/character`,
        updatedData
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ["plotList"] });
    },
  });

  const { mutate: deleteChar } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.delete(
        `/team/${teamId}/product/${productId}/character`
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["char"] });
    },
  });


  return { charData, getCharIsSuccess, createChar, updateChar, deleteChar };
};

export default useCharQueryModule;
