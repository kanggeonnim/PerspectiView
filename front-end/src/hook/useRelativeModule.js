import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "@/util/api";
import useRelativeStore from "@/store/useRelativeStore";

const useRelativeModule = (teamId, productId) => {
  const queryClient = useQueryClient();
  const {nodes, setNodes, edges, setEdges, viewport, setViewport} = useRelativeStore();
  const { data: relativeList, isSuccess: getRelativeListIsSuccess } = useQuery({
    queryKey: ["relativeList"],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}/product/${productId}/relative`);
      console.log(response);
      return response.data.response;
    },
  });

  const { mutate: createRelative } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.post(
        `/api/team/${teamId}/product/${productId}/relatives`,
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
        `/api/team/${teamId}/product/${productId}/relatives`,
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
        `/api/team/${teamId}/product/${productId}/relatives`
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

export default useRelativeModule;
