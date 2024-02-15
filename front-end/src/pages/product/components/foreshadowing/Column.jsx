import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ForeshadowingCard } from "./ForeshadowingCard";

export default function Column({ column, colFshadows }) {
  return (
    <div className="flex flex-col items-center w-full h-[100%] mx-1  min-w-40 ">
      <div className="box-border flex justify-start w-full my-1 ">
        <h3 className="mx-2 ml-5 text-lg font-semibold">{column.title}</h3>
        <Badge
          className={`text-foreground font-extrabold rounded-full bg-accent text-accent-foreground`}
        >
          {column.fshadowsIds.length}
        </Badge>
      </div>
      <div className="w-full h-[100%] p-0 my-2  ">
        <ScrollArea className="flex flex-col items-center justify-between overflow-y-auto   h-[30rem] ">
          <div className="m-1 ">
            {colFshadows.map((colFshadow, index) => (
              <ForeshadowingCard key={colFshadow.fshadowId} colFshadow={colFshadow} index={index} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
