/* eslint-disable react/jsx-key */
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import CharInfo from "./CharInfo";
import LabelAdd from "./reactflow/LabelAdd";


export default function CharList({ users, onIdxChange }) {
  
  const onIdxContain = (idx) => {
    onIdxChange(idx)
    // console.log(idx)
  }
  // 


  return (
    <div className="flex flex-wrap gap-2">
      {users.map((user) => (
        <AlertDialog key={user.id}>
          <AlertDialogTrigger>
            <CharInfo user={user} onIdxChange={(idx) => onIdxContain(idx) }/>
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
                    key={user.id}
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
              
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ))}
      <LabelAdd />
    </div>
  );
}
