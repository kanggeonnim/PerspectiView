import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import useCommentQueryModule from "@/hook/useCommentQueryModule";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Comment() {
  const { teamId, productId, plotId, storyId } = useParams();
  const { commentData, createComment, deleteComment, updateComment } =
    useCommentQueryModule(teamId, productId, plotId, storyId);
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // 편집 모드 활성화
  const handleEditButton = (comment) => {
    setEditingId(comment.commentId);
    setEditText(comment.commentContent);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // 수정 등록
  const handleSaveEdit = ({ commentId, updatedData }) => {
    updateComment({ commentId, updatedData });
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="flex flex-col justify-between max-h-full min-h-full ">
      <ScrollArea className=" rounded-md h-[320px]">
        <div className="px-4">
          {commentData?.map((comment) => (
            <Card className="w-full mt-8" key={comment.commentId}>
              <CardHeader>
                <CardTitle className="flex justify-between ">
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage src={comment.user.userImage} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <div className="mx-3">{comment.user.userNickname}</div>
                      <div className="mx-3">{comment.user.userEmail}</div>
                      <div className="mx-3 text-sm text-gray-400">
                        {comment.modifiedDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ">
                    {editingId === comment.id ? null : (
                      <button onClick={() => handleEditButton(comment)}>
                        <Pencil size={20} strokeWidth={1.5} />
                      </button>
                    )}
                    {/* 삭제 */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button>
                          <Trash2 size={20} strokeWidth={1.5} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            댓글을 삭제하시겠습니까?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteComment(comment.commentId)}
                          >
                            확인
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingId === comment.commentId ? (
                  <div className="flex flex-col items-end">
                    <Textarea
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex gap-3 mt-3">
                      <Button onClick={handleCancelEdit}>취소</Button>
                      <Button
                        onClick={() => {
                          // console.log(editText);
                          handleSaveEdit({
                            commentId: comment.commentId,
                            updatedData: { commentContent: editText },
                          });
                        }}
                      >
                        등록
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>{comment.commentContent}</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <Textarea
        placeholder="댓글을 입력하세요."
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        className="w-full h-full"
      />
      <Button
        type="submit"
        className="self-end w-24"
        onClick={() => {
          createComment({ commentContent: comment });
          setComment("");
        }}
      >
        등록
      </Button>
    </div>
  );
}
