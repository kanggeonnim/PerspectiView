import { useQuery, useQueryClient } from "@tanstack/react-query";
import { publicApi } from "@/util/api";

const useGenreQueryModule = () => {
    const queryClient = useQueryClient();

    const { data: genreData, isSuccess } = useQuery("genreData", async () => {
        const response = await publicApi.get(`api/genre`);
        return response.data.response;
    });

    return {
        genreData,
        genreDataIsSuccess: isSuccess
    };
};

export default useGenreQueryModule;