import api from "@/util/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useCharQueryModule = () => {
  const queryClient = useQueryClient();
  
  const { data: charData, isSuccess: getCharIsSuccess} = useQuery ({
    queryKey: ["char"],
    queryFn: async () => {
      const response = await api.get("/api/char/:id/")
      console.log(response)
      return response.data.response;
    }

  })




  return {charData, getCharIsSuccess};


}

export default useCharQueryModule;