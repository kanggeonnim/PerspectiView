import { useCharacterListStore } from "@/store/useCharacterListStore";
import { formApi, privateApi } from "@/util/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useCharQueryModule = (teamId, productId, characterId) => {
  const queryClient = useQueryClient();
  const { setCharacterList } = useCharacterListStore();

  const {
    data: charData,
    isSuccess: getCharIsSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["char", teamId, productId],
    queryFn: async () => {
      const response = await privateApi.get(`/api/team/${teamId}/product/${productId}/character`);
      if (response) {
        setCharacterList(response.data.response);
        return response.data.response;
      }
    },
  });

  const { mutate: createChar } = useMutation({
    mutationFn: async (newData) => {
      const formData = new FormData();
      const json = JSON.stringify(newData.characPostRequestDto);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("characPostRequestDto", blob);
      formData.append("uploadImage", newData.uploadImage);
      const response = await formApi.post(
        `/api/team/${teamId}/product/${productId}/character`,
        formData
      );
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
        `/api/team/${teamId}/product/${productId}/character/${characterId}`,
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
        `/api/team/${teamId}/product/${productId}/character`
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
