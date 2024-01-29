import { Card } from "@/components/ui/card"

export function CharCard() {

  return (
    <div className="flex justify-center items-center">
      <Card className="w-5/6 h-[75vh]">
        <div className="grid grid-cols-2 grid-flow-row p-3 box-border">
          <div className="col-span-1 h-[70vh] border-r box-border m-2">
            1
          </div>
          <div className="col-span-1 box-border m-2">
            2
          </div>
        </div>  
      </Card>
    </div>
  )


}