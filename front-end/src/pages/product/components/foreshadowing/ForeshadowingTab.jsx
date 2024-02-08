import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFshadow } from "@/store/useFshadow";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Column from "./Column";

export default function ForeshadowingTab() {
  //state는 {tasks:{각 복선 정보딕셔id,Name} ,columns:{각 컬럼 정보딕셔너리id,title,taksIds}, columnsOrder:[]}
  const { fshadows, setFshadows } = useFshadow((state) => ({
    fshadows: state.fshadows,
    setFshadows: state.setFshadows,
  }));

  //TODO API콜
  useEffect(() => {
    // 상태 변경이 실제로 필요한지 검사하기 위한 변수
    console.log("복선 상태 변경");
    let isUpdateNeeded = false;

    const updatedFshadows = Object.keys(fshadows).reduce((acc, key) => {
      const fshadow = fshadows[key];
      let newColumnId = fshadow.columnId;

      if (fshadow.storyIdList.length === 0) {
        newColumnId = "column-1";
      } else if (fshadow.fshadowClose) {
        newColumnId = "column-3";
      } else {
        newColumnId = "column-2";
      }

      if (newColumnId !== fshadow.columnId) {
        isUpdateNeeded = true; // 업데이트가 필요한 경우 표시
        acc[key] = { ...fshadow, columnId: newColumnId };
      } else {
        acc[key] = fshadow;
      }

      return acc;
    }, {});

    if (isUpdateNeeded) {
      setFshadows(updatedFshadows);
    }
  }, [fshadows, setFshadows]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // TODO productId, fromStoryId,toStoryId
  const createData = () => {
    // const newData = {
    //   productId: "1",
    //   fshadowName: title,
    //   fshadowContent: content,
    // };
    //post요청
    // mutation.mutate(newData)
    // setTriggerUpdate();
  };

  // const onDragEnd = (result) => {
  //   const { destination, source, draggableId } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   //컬럼 내의 이동
  //   const start = state.columns[source.droppableId];
  //   const finish = state.columns[destination.droppableId];

  //   if (start === finish) {
  //     const newTaskIds = Array.from(start.taskIds);
  //     newTaskIds.splice(source.index, 1);
  //     newTaskIds.splice(destination.index, 0, draggableId);

  //     const newColumn = {
  //       ...start,
  //       taskIds: newTaskIds,
  //     };

  //     const newState = {
  //       ...state,
  //       columns: {
  //         ...state.columns,
  //         [newColumn.id]: newColumn,
  //       },
  //     };

  //     setState(newState);
  //     return;
  //   }

  //   // Moving from one list to another
  //   const startTaskIds = Array.from(start.taskIds);
  //   startTaskIds.splice(source.index, 1);
  //   const newStart = {
  //     ...start,
  //     taskIds: startTaskIds,
  //   };

  //   const finishTaskIds = Array.from(finish.taskIds);
  //   finishTaskIds.splice(destination.index, 0, draggableId);
  //   const newFinish = {
  //     ...finish,
  //     taskIds: finishTaskIds,
  //   };
  //   const newState = {
  //     ...state,
  //     columns: {
  //       ...state.columns,
  //       [newStart.id]: newStart,
  //       [newFinish.id]: newFinish,
  //     },
  //   };
  //   setState(newState);
  // };

  //이렇게 안해도 될 듯?? but 변경하려면 시간 걸리니까 일단 두자
  const columns = {
    "column-1": {
      id: "column-1",
      title: "미사용 복선",
      fshadowsIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "사용 중인 복선",
      fshadowsIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "회수 완료 복선",
      fshadowsIds: [],
    },
  };

  //컬럼 taskIds 채우기
  Object.keys(fshadows).forEach((key) => {
    const fshadow = fshadows[key];
    columns[fshadow.columnId].fshadowsIds.push(fshadow.fshadowId);
  });
  console.log("각 컬럼에 복선id넣기 다시 실행됨");

  return (
    <div className="">
      <Card className="box-border h-full p-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl">복선 목록</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <PlusCircle size={24} />
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>복선생성하기</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center w-full gap-5">
                <div className="flex flex-col w-full space-y-1.5">
                  <Label htmlFor="title">복선 타이틀</Label>
                  <Input
                    id="title"
                    value={title}
                    placeholder="복선의 타이틀을 입력하세요"
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
              <DialogFooter>
                <Button type="submit" onClick={createData}>
                  생성하기
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="box-border flex flex-row justify-around gap-4 px-12 py-6 h-5/6">
          {["column-1", "column-2", "column-3"].map((columnId) => {
            const column = columns[columnId];
            const colFshadows = column.fshadowsIds.map(
              (fshadowsId) => fshadows[fshadowsId]
            );
            return (
              <Column
                key={column.id}
                column={column}
                colFshadows={colFshadows}
              />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
