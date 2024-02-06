import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ForeshadowingCard } from "./ForeshadowingCard";

export default function Column({ column, colFshadows }) {
  return (
    <div className="flex flex-col items-center w-1/3">
      <div className="box-border flex justify-start w-full gap-3 px-4">
        <h3 className="text-xl font-semibold">{column.title}</h3>
        <Badge className="text-yellow-700 bg-yellow-300 rounded-full">
          {column.fshadowsIds.length}
        </Badge>
      </div>
      <ScrollArea className="flex flex-col items-center w-full m-2 overflow-y-auto h-72">
        <div className="p-2 min-h-24">
          {colFshadows.map((colFshadow, index) => (
            <ForeshadowingCard
              key={colFshadow.fshadowId}
              colFshadow={colFshadow}
              index={index}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
