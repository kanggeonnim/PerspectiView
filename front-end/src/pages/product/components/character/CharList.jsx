/* eslint-disable react/jsx-key */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";



const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

function Char({ user }) {
  return (
    <div className="flex justify-center">
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "custom")}
        draggable
      >
        <div className="flex flex-col items-center w-max h-max">
          <img
            className="flex items-center justify-center w-24 h-24 border-dashed rounded-full"
            src={user.url}
            alt="cover of work"
            key={user.id}
          />
          <div className="m-2">{user.name}</div>
        </div>
      </div>
      
    </div>
  );
}
export default function CharList({ users }) {
  return (
    <div className="flex flex-wrap gap-2">
      {users.map((user, index) => (
        <AlertDialog>
          <AlertDialogTrigger>
            <Char user={user} key={index} />
          </AlertDialogTrigger>
          <AlertDialogContent className="flex flex-col w-2/3 max-w-2/3 h-2/3 ">
            <CardTitle className="text-2xl box-border">
              <div>인물 상세 정보</div>
            </CardTitle>
            <div className="box-border flex flex-row w-full h-3/4 ">
              <AlertDialogHeader className="flex w-1/3 h-full items-center">
                <div className="flex items-center justify-center w-40 h-40 my-3 bg-gray-300 border rounded-full">
                  <img
                    className="flex items-center justify-center w-40 h-40 my-3 bg-gray-300 border rounded-full"
                    src={user.url}
                    key={index}
                    alt=""
                  />
                </div>
              </AlertDialogHeader>
              <div className="box-border flex flex-col w-2/3 h-full">
                <div className="flex flex-col justify-around w-full h-full">
                  <div className="flex flex-row w-full m-2 h-1/4">
                    <div className="box-border w-1/5 mr-3 text-xl">이름</div>
                    <div className="box-border w-4/5">{user.name}</div>
                  </div>
                  <div className="flex flex-row w-full m-2 h-1/4">
                    <div className="box-border w-1/5 mr-3 text-xl">특징</div>
                    <div className="box-border w-4/5">
                      {user.tag.map((tag, index) => (
                        <Badge variant="off" className="mr-1" key={index}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row w-full m-2 h-2/3">
                    <div className="box-border w-1/5 mr-3 text-xl">
                      세부 사항
                    </div>
                    <div className="box-border w-4/5 h-full">
                      {user.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="h-1/4 border-t box-border p-3">
              <h2 className=" text-xl font-semibold">인물이 등장한 스토리</h2>
              <div>등장 스토리 추가 위치</div>
            </div> */}
            <AlertDialogFooter>
              <AlertDialogCancel>닫기</AlertDialogCancel>
              {/* <AlertDialogAction onClick={onCreate}>생성하기</AlertDialogAction> */}
              {/* FIXME 해당 생성하기는 추후 작품 생성 기능 구현 */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ))}
    <div className="flex justify-center">
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'label')} draggable>
        인물 관계 추가
      </div>
    </div>
    </div>
  );
}
