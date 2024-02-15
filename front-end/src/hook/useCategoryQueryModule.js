import { useQuery, useQueryClient } from "@tanstack/react-query";
import { privateApi, publicApi } from "@/util/api";
import { useCategoryStore } from "@/store/useCategoryStore";

const useCategoryQueryModule = () => {
    const queryClient = useQueryClient();
    const {data: categoryData, isSuccess: categoryDataIsSuccess} = useQuery({
        queryKey: ["genreData"],
        queryFn: async() => {
            const response = await publicApi.get(`api/category`)
            console.log(response)
            return response.data.response
        }
    })

    return {
        categoryData,
        categoryDataIsSuccess
    }
}

export default useCategoryQueryModule;