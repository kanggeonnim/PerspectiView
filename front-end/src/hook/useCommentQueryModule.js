import { privateApi } from "@/util/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useCommentQueryModule = (
  teamId,
  productId,
  plotId,
  storyId,
  commentId
) => {
  const queryClient = useQueryClient();
  //댓글 조회
  const { data: commentData, isSuccess: getCommentDataIsSuccess } = useQuery({
    queryKey: ["storyComment"],
    queryFn: async () => {
      const response = await privateApi.get(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}/comment`
      );
      console.log("스토리 댓글 조회", response);
      return response.data.response;
    },
  });
  // 댓글 추가
  const { mutate: createComment } = useMutation({
    mutationFn: async (newData) => {
      const response = await privateApi.post(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}/comment`,
        newData
      );
      console.log("스토리 댓글 생성", response);
      return response.data.response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["storyComment"],
      });
    },
  });

  // put(댓글 내용)
  const { mutate: updateComment } = useMutation({
    mutationFn: async (updatedData) => {
      const response = await privateApi.put(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}/comment/${commentId}`,
        updatedData
      );
      console.log("댓글 수정", response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["storyComment"],
      });
    },
  });

  //delete
  const { mutate: deleteComment } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.delete(
        `/api/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyId}/comment/${commentId}`
      );
      console.log("댓글 삭제", response);
      return response.data.response;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["storyComment"],
      });
    },
  });

  return {
    commentData,
    getCommentDataIsSuccess,
    createComment,
    updateComment,
    deleteComment,
  };
};
export default useCommentQueryModule;
