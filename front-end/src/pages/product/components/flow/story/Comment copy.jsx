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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
      content: "comment1",
      created: "2024-02-01",
      updated: "2024-02-02",
    },
    {
      id: 2,
      userId: "ssafy2",
      content: "comment2",
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
    <div>
      <ScrollArea className="border rounded-md h-72">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Comments</h4>
          {comments.map((comment) => (
            <div key={comment.id}>
              {/* //TODO 구조-ssafy따라하기 */}
              <div className="text-sm">
                <div>{comment.userId}</div>
                {editingId === comment.id ? (
                  <div>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={() => setEditingId(null)}>취소</button>
                    <button onClick={handleEditSave}>등록</button>
                  </div>
                ) : (
                  <div>{comment.content}</div>
                )}
                {editingId === comment.id ? null : (
                  <div onClick={() => handleEditButton(comment)}>
                    <Pencil size={20} strokeWidth={1.5} />
                  </div>
                )}
                {/* 삭제기능 */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div>
                      <Trash2 size={20} strokeWidth={1.5} />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        댓글을 삭제하시겠습니까?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        확인
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex">
        <Input
          placeholder="댓글을 남겨주세요"
          value={comment}
          onChange={handleInputChange}
        />
        <Button type="submit">등록</Button>
      </form>
    </div>
  );
}
