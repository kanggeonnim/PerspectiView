import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useFshadowQueryModule from "@/hook/useFshadowQueryModule";
import { useFshadow } from "@/store/useFshadow";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Column from "./Column";

export default function ForeshadowingTab() {
  const { teamId, productId } = useParams();
  const { createFshadow } = useFshadowQueryModule(teamId, productId);

  const { fshadows } = useFshadow((state) => ({
    fshadows: state.fshadows,
  }));

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const columns = {
    "column-1": {
      id: "column-1",
      title: "미사용",
      fshadowsIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "사용 중",
      fshadowsIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "회수 완료",
      fshadowsIds: [],
    },
  };

  //컬럼 taskIds 채우기
  Object.keys(fshadows).forEach((key) => {
    const fshadow = fshadows[key];
    columns[fshadow.columnId].fshadowsIds.push(fshadow.fshadowId);
  });

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-end h-4 ">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <PlusCircle className="cursor-pointer" size={24} />
          </AlertDialogTrigger>
          <AlertDialogContent className="">
            <AlertDialogHeader>
              <div className="font-bold">복선 생성</div>
            </AlertDialogHeader>
            <div className="flex flex-col items-center w-full gap-5">
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="title">복선 제목</Label>
                <Input
                  id="title"
                  value={title}
                  placeholder="복선의 제목을 입력하세요"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="content">복선 내용</Label>
                <Textarea
                  id="content"
                  value={content}
                  placeholder="복선에 대해 간략히 입력하세요"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="shadow-sm bg-secondary text-secondary-foreground hover:bg-secondary-accent"
                onClick={() => {
                  setTitle("");
                  setContent("");
                }}
              >
                취소
              </AlertDialogCancel>
              <AlertDialogAction
                // type="submit"
                onClick={() => {
                  console.log({
                    fshadowName: title,
                    fshadowContent: content,
                  });
                  // create
                  createFshadow({
                    fshadowName: title,
                    fshadowContent: content,
                  });
                  setTitle("");
                  setContent("");
                }}
              >
                생성
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent className="box-border flex flex-row items-center justify-between w-full p-0 h-5/6">
        {["column-1", "column-2", "column-3"].map((columnId) => {
          const column = columns[columnId];
          const colFshadows = column.fshadowsIds.map(
            (fshadowsId) => fshadows[fshadowsId]
          );
          return (
            <Column key={column.id} column={column} colFshadows={colFshadows} />
          );
        })}
      </CardContent>
    </Card>
  );
}
