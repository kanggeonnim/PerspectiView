import { privateApi } from "@/util/api";
import { useQuery } from "@tanstack/react-query";

const useExportModule = (teamId, productId) => {
  // const queryClient = useQueryClient();
  const { data: exportWordData, error } = useQuery({
    queryKey: ["exportWord"],
    queryFn: async () => {
      try {
        const response = await privateApi.get(
          `/api/team/${teamId}/product/${productId}/word`,
          {
            responseType: "blob",
          }
        );
        // API 호출이 성공적으로 완료되면, 응답 데이터 반환
        console.log("내보내기", response);
        return response.data;
      } catch (err) {
        // API 호출에서 오류가 발생하면, 오류 객체 반환
        console.error("An error occurred while fetching the data:", err);
        return err; // 또는 적절한 기본값/오류 메시지 반환
      }
    },
  });
  return {
    exportWordData,
    error,
  };
};

export default useExportModule;
