import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "@/util/api";
import { useProductStore } from "@/store/useProductStore";
import useRelativeStore from "@/store/relative/useRelativeStore";
import useNodeStore from "@/store/useNodeStore";

const useRelativeQueryModule = (teamId, productId) => {
  const queryClient = useQueryClient();
  const { setProduct } = useProductStore();
  const { setNodes } = useNodeStore();

  const { data: relativeList, isSuccess: getRelativeListIsSuccess, isLoading: relativeListIsLoading } = useQuery({
    queryKey: ["relativeList",teamId, productId],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}/product/${productId}/relation`);
      // console.log(response);
      return response.data.response;
    },
  });

  const { mutate: createRelative } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.post(
        `/api/team/${teamId}/product/${productId}/relation`,
        newData
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["relativeList"] });
    },
  });

  const { mutate: updateRelative } = useMutation({
    mutationFn: async (updatedData) => {
      console.log("update", updatedData, teamId, productId);
      const response = await privateApi.put(
        `/api/team/${teamId}/product/${productId}/relation`,
        updatedData
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["relativeList"] });
    },
  });

  const { mutate: deleteRelative } = useMutation({
    mutationFn: async () => {
      console.log(teamId, productId, plotId);
      const response = await privateApi.delete(
        `/api/team/${teamId}/product/${productId}/relation`
      );
      console.log(response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["relativeList"] });
    },
  });

  return { relativeList, getRelativeListIsSuccess, createRelative, updateRelative, deleteRelative };
};

export default useRelativeQueryModule;
