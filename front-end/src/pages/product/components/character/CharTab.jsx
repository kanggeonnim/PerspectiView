import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import CharInfo from "./CharInfo";
import DnDFlow from "./reactflow/DragAndDrop";

export default function CharTab() {
  return (
    // TODO: 인물 tab contents 크기 수정
    <div className="box-border flex items-center justify-center w-full h-full p-2">
      <Card className="box-border w-full h-full">
        <div className="box-border flex flex-row h-full p-3">
          <div className="box-border w-2/3 m-2 text-2xl font-semibold border-r h-11/12">
            인물 관계도
            <DnDFlow />
          </div>
          <div className="flex flex-col w-1/3">
            <div className="flex justify-between">
              <div className="box-border w-1/2 m-2 text-2xl font-semibold h-11/12">인물 목록</div>
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
  );
}
