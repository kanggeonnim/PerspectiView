import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function CharCreateCard() {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* FIXME 해당 h-screen은 비율 임시 확인용, 수정할 것  */}
      <Card className="w-7/12 p-4 h-2/3">
        <div className="box-border p-3 h-1/6">
          <h1 className="flex items-start justify-start text-3xl font-semibold">인물 정보 작성</h1>
        </div>
        <div className="flex items-center justify-center w-full gap-6 h-3/6">
          <div className="w-1/4">
            {/* IMAGE */}
            {/* FIXME 빈 이미지를 여기에 */}
          </div>
          <div className="flex flex-col justify-center w-3/5 h-3/4">
            <div className="flex items-center w-full gap-4 h-1/4">
              <div className="w-1/4">이름</div>
              <input type="text" placeholder="이름" className="w-3/4" />
            </div>
            <div className="flex items-center w-full gap-4 h-2/4">
              <div className="w-1/4">특징</div>
              <div className="flex items-center w-3/4 gap-4 h-1/2">
                <PlusCircleIcon className="" />
              </div>
            </div>
            <div className="flex items-center w-full gap-4 h-1/4">
              <div className="w-1/4">세부사항</div>
              <input type="text" placeholder="세부사항" className="w-3/4" />
            </div>
          </div>
        </div>
        <div className="border-t-2 h-1/6">
          <h3 className="m-2 font-semibold text-md">인물이 등장한 스토리</h3>
          <div className="flex flex-wrap gap-3">{/* FIXME 뱃지를 여기에 */}</div>
        </div>
        <CardFooter className="flex flex-row items-end justify-end gap-3 items h-1/6">
          <Button
            className="box-border flex w-1/4 md:w-1/6 sm:text-xs md:text-sm lg:text-base"
            variant="gray"
          >
            취소하기
          </Button>
          <Button
            className="box-border flex w-1/4 md:w-1/6 sm:text-xs md:text-sm lg:text-base"
            variant="indigo"
          >
            등록하기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
