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
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

//TODO 마우스 호버시 색상 변하고 마우스 모양 변하는 것
export default function Comment() {
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  //TODO 댓글 조회 로직 (임시 데이터--api형식 요청하기)
  const comments = [
    {
      id: 1,
      userId: "ssafy1",
      content:
        "My구독은 정기 결제를 통해 ‘이모티콘 플러스’, ‘톡서랍 플러스’ 서비스를 이용할 수 있는 구독형 서비스입니다. 이번에 My구독에서 Redux와 Redux-Saga를 제거하고, React Query(v.3.34.0)로 전환하면서 느낀 점들을 공유드리려고 합니다.",
      created: "2024-02-01",
      updated: "2024-02-02",
    },
    {
      id: 2,
      userId: "ssafy2",
      content:
        "My구독은 정기 결제를 통해 ‘이모티콘 플러스’, ‘톡서랍 플러스’ 서비스를 이용할 수 있는 구독형 서비스입니다. 이번에 My구독에서 Redux와 Redux-Saga를 제거하고, React Query(v.3.34.0)로 전환하면서 느낀 점들을 공유드리려고 합니다.22",
      created: "2024-02-01",
      updated: "2024-02-02",
    },
    {
      id: 3,
      userId: "ssafy3",
      content:
        "My구독은 정기 결제를 통해 ‘이모티콘 플러스’, ‘톡서랍 플러스’ 서비스를 이용할 수 있는 구독형 서비스입니다. 이번에 My구독에서 Redux와 Redux-Saga를 제거하고, React Query(v.3.34.0)로 전환하면서 느낀 점들을 공유드리려고 합니다.22",
      created: "2024-02-01",
      updated: "2024-02-02",
    },
  ];
  const handleInputChange = (event) => {
    setComment(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(comment);
    //TODO 댓글 추가 로직, 업데이트
  };
  const handleDelete = () => {
    //TODO 삭제 로직
    console.log("deleted");
  };

  const handleEditButton = (comment) => {
    console.log("edit clicked");
    setEditingId(comment.id);
    setEditText(comment.content);
  };

  const handleEditSave = () => {
    //TODO 댓글 수정 로직
    console.log("edited");
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="flex flex-col justify-between max-h-full min-h-full ">
      <ScrollArea className=" rounded-md h-[320px]">
        <div className="px-4">
          {comments.map((comment) => (
            <Card className="w-full mt-8" key={comment.id}>
              <CardHeader>
                <CardTitle className="flex justify-between ">
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <div className="mx-3">{comment.userId}</div>
                      <div className="mx-3 text-sm text-gray-400">{comment.created}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ">
                    {editingId === comment.id ? null : (
                      <button onClick={() => handleEditButton(comment)}>
                        <Pencil size={20} strokeWidth={1.5} />
                      </button>
                    )}
                    {/* 삭제기능 */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button>
                          <Trash2 size={20} strokeWidth={1.5} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>댓글을 삭제하시겠습니까?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>확인</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingId === comment.id ? (
                  <div className="flex flex-col items-end">
                    <Textarea
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex gap-3 mt-3">
                      <Button onClick={() => setEditingId(null)}>취소</Button>
                      <Button onClick={handleEditSave}>등록</Button>
                    </div>
                  </div>
                ) : (
                  <div>{comment.content}</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3 p-3 h-1/4">
        <Textarea
          placeholder="댓글을 입력하세요."
          value={comment}
          onChange={handleInputChange}
          className="w-full h-full"
        />
        <Button type="submit" className="self-end w-24">
          등록
        </Button>
      </form>
    </div>
  );
}
