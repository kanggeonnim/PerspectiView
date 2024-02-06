import { Card } from "@/components/ui/card";

export default function CharDetailCard() {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* FIXME 해당 h-screen은 비율 임시 확인용, 수정할 것  */}
      <Card className="w-7/12 p-4 h-1/2">
        <h1 className="flex items-start justify-start text-3xl font-semibold">인물 상세 정보</h1>
        <div className="flex items-center justify-center w-full gap-6 h-2/3">
          <div className="w-1/4">{/* FIXME IMAGE */}</div>
          <div className="flex flex-col justify-center w-3/5 h-full">
            <div className="flex items-center w-full gap-4 h-1/4">
              <div className="w-1/4">이름</div>
              <input type="text" placeholder="이름" className="w-3/4" />
            </div>
            <div className="flex items-center w-full gap-4 h-2/4">
              <div className="w-1/4">특징</div>
              <div className="flex flex-wrap w-3/4 gap-4 overflow-y-auto h-1/2">
                {/* FIXME 뱃지를 여기에 */}
              </div>
            </div>
            <div className="flex items-center w-full gap-4 h-1/4">
              <div className="w-1/4">세부사항</div>
              <input type="text" placeholder="세부사항" className="w-3/4" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
