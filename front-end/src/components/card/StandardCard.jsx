import { 
  Card, 
} from "../ui/card";

export function StandardCard() {

  return (
    <div className="flex justify-center items-center">
      <Card className="w-5/6 h-[75vh] grid grid-cols-2 grid-flow-row">
        <div className="col-span-1">
          {/* TODO grid 설정은 인물 카드로, 복선은 추가 설정 */}
        </div>
        <div className="col-span-1">
          2
        </div>
      </Card>
    </div>
  )


}