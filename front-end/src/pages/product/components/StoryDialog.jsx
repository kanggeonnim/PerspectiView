import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { ForeshadowingCard } from "../../../components/card/ForeshadowingCard";
import { Button } from "../../../components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function StoryDialog({ className }) {
  return (
    // <Card className={cn("grid grid-rows-4 grid-cols-2 grid-flow-col p-2 w-full", className)}>
    <Card className={cn("flex flew-row p-2 w-full", className)}>
      {/* FIXME 해당 위치에서 grid 지양 => flex로 재편 */}
      <div className="flex flex-col w-1/2">
        <CardContent className="border p-4 h-1/2">
          <CardTitle className="pt-2 text-2xl">전체 인물 관계도</CardTitle>
          <div className="p-2">
            <img src="" alt="" />
          </div>
        </CardContent>
        <CardContent className="border p-4 h-1/2">
          <CardTitle className="py-2 text-2xl">복선</CardTitle>
          <div className="flex flex-wrap justify-center h-4/5 overflow-y-scroll">
            {/* TODO 복선카드 크기 조절 */}
            <ForeshadowingCard />
            <ForeshadowingCard />
            <ForeshadowingCard />
            <ForeshadowingCard />
          </div>
        </CardContent>
      </div>
      <div className="flex flex-col w-1/2">
        <CardContent className="p-4 h-1/2">
          <div className="flex flex-col h-full justify-between">
            <div className="text-2xl font-semibold">
              {/* TODO 여기에 스토리 이름 입력 */} 스토리 이름
            </div>
            <div className="mt-4 text-xl font-semibold">등장인물</div>
            <div>{/* TODO 여기에 등장인물 이미지 */}</div>
            <div className="flex text-2xl font-semibold ">내용</div>
          </div>
        </CardContent>
        <CardContent className="p-4 h-1/2 w-full">
          <div className="flex flex-col box-border h-full justify-between">
            <Textarea placeholder="여기에 입력" className="p-2 h-3/4" />
            <CardFooter className="flex flex-row justify-end mt-2 gap-2">
              <Button className="flex box-border w-1/4 md:w-1/6 sm:text-xs md:text-sm lg:text-base" variant="gray">
                취소하기
              </Button>
              <Button className="flex box-border w-1/4 md:w-1/6 sm:text-xs md:text-sm lg:text-base" variant="indigo">
                등록하기
              </Button>
            </CardFooter>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
