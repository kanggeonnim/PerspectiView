import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CardTitle } from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";
import { Plus } from "lucide-react";
import CharTag from "./CharTag";
import CharTagAdd from "./CharTagAdd";



export default function CharAdd({name, description, onChange, onCreate }) {
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Plus className="mt-4 mr-8" size={20} color="#52525b" />
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col w-2/3 max-w-2/3 h-3/4 ">
        <CardTitle className="text-2xl box-border">
          <div>인물 추가</div>
        </CardTitle>
        <div className="box-border flex flex-row w-full h-3/4 ">
          <AlertDialogHeader className="flex w-1/3 h-full items-center">
            <div className="flex items-center justify-center w-40 h-40 my-3 bg-gray-300 border rounded-full">
              <PlusCircleIcon />
            </div>
          </AlertDialogHeader>
          <div className="box-border flex flex-col w-2/3 h-full">
            <div className="flex flex-col justify-around w-full h-full justify-between">
              <div className="flex flex-row w-full m-2 h-1/4">
                <div className="box-border w-1/5 mr-3 text-xl">이름</div>
                <div className="box-border w-4/5">
                  <input
                    name="name"
                    className="border"
                    onChange={onChange}
                    value={name}
                  />
                </div>
              </div>
              <div className="flex flex-row w-full m-2 h-1/4">
                <div className="box-border w-1/5 mr-3 text-xl">특징</div>
                <div className="box-border w-4/5 h-1/2">
                  {/* <CharTag /> */}
                  <CharTagAdd />
                </div>
              </div>
              <div className="flex flex-row w-full m-2 h-2/3">
                <div className="box-border w-1/5 mr-3 text-xl">세부 사항</div>
                <div className="box-border w-4/5 h-full">
                  <input
                    className="w-4/5 h-full border z-30"
                    name="description"
                    onChange={onChange}
                    value={description}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1/4 border-t box-border p-3">
          <h2 className=" text-xl font-semibold">인물이 등장한 스토리</h2>
          <div>등장 스토리 추가 위치</div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>취소하기</AlertDialogCancel>
          <AlertDialogAction onClick={onCreate}>생성하기</AlertDialogAction>
          {/* FIXME 해당 생성하기는 추후 작품 생성 기능 구현 */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
