import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircleIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function ProductDetail({isDetail}){
  // TODO usestate를 통한 분기 적용

  return (
    <Card className="flex flex-row w-2/3 h-2/3">
      <CardContent className="box-border flex flex-col w-1/3 h-full p-3 m-3 border-r">
        <CardTitle className="text-2xl">
          {isDetail ? <div>작품 조회</div> : <div>작품 생성</div>}
        </CardTitle>
        <div className="flex w-1/2 h-[168px] justify-center items-center border bg-gray-300 my-3">
          {isDetail ? <></> : <PlusCircleIcon />}
        </div>
      </CardContent>
      <CardContent className="box-border flex flex-col w-2/3 h-full p-3">
        <div className="flex flex-col justify-around w-full h-5/6">
          <div className="flex flex-row w-full m-2">
            <div className="box-border w-1/6 mr-3 text-xl">
              작품명
            </div>
            <div className="box-border w-5/6">
            {isDetail ? <div>일이삼사</div> : <input type="text" className="border" />}
            </div>
          </div>
          <div className="flex flex-row w-full m-2">
            <div className="box-border w-1/6 mr-3 text-xl">
              장르
            </div>
            <div className="box-border flex flex-wrap w-5/6 gap-2">
              <Badge variant="destructive">123</Badge>
              <Badge className="font-semibold text-black bg-gray-400">123</Badge>
              {/* FIXME 임시 클릭으로 변경 계획중 */}
            </div>
          </div>
          <div className="flex flex-row w-full m-2">
            <div className="box-border w-1/6 mr-3 text-xl">
             분류
            </div>
            <div className="box-border flex flex-wrap w-5/6 gap-2">
              <Badge variant="destructive">123</Badge>
              <Badge className="font-semibold text-black bg-gray-400">123</Badge>
              {/* FIXME 임시 클릭으로 변경 계획중 */}
            </div>
          </div>
          <div className="flex flex-row w-full m-2">
            <div className="box-border w-1/6 mr-3 text-xl">
              설명
            </div>
            <div className="box-border w-5/6">
              하나둘삼넷오여섯칠팔아홉공 수신감명도삼삼
            </div>
          </div>             
        </div>
        <CardFooter className="box-border flex justify-end w-full my-3 h-1/6">
          <Button className="w-1/6" variant="indigo">
            편집하기
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )

}