import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import CharInfo from "./CharInfo"


export function CharTab() {

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="box-border w-5/6 h-full p-3">
        <div className="box-border flex flex-row h-full p-3">
          <div className="box-border w-1/2 m-2 text-2xl font-semibold border-r h-11/12">
            인물 관계도
            <div>
              {/* TODO 여기에 인물관계도 */}
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="flex justify-between">
              <div className="box-border w-1/2 m-2 text-2xl font-semibold h-11/12">
                인물 목록
              </div>
              <Plus className="mt-4 mr-8" size={20} color="#52525b" />
            </div>
            <div className="box-border flex flex-wrap gap-3 m-2">
              {/* 인물 이미지 */}
              <CharInfo />
              <CharInfo />
              <CharInfo />
              <CharInfo />
              <CharInfo />
              <CharInfo />
              
              
              
            </div>
          </div>
        </div>  
      </Card>
    </div>
  )


}