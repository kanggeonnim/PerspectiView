import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Handle, Position } from "reactflow";

// TODO: 플롯으로 스토리 조회 API 호출 시 charaList에 id, 이름, 이미지 와야 됨
const characListData = [
  {
    characterId: 0,
    characterName: "whitedragon",
    img: `https://github.com/shadcn.png`,
  },
  ...Array.from({ length: 10 }, (_, index) => ({
    characterId: index + 1,
    characterName: "whitedragon",
    img: `https://ui.shadcn.com/avatars/0${index + 1}.png`,
  })),
];

export default function CustomNode({ id, data }) {
  return (
    <>
      <div
        className="flex items-center justify-center w-32 h-40 p-4 border rounded"
        style={{
          borderColor: `${data.color}`,
        }}
      >
        <div>{data.title}</div>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
      <div className="absolute w-[120px] border-2">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex ">
              <Avatar key={characListData[0].characterId}>
                <AvatarImage src={characListData[0].img} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {characListData.slice(1, 3).map((charac) => (
                <Avatar key={charac.characterId} className="-ml-3">
                  <AvatarImage src={charac.img} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-120">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
              <div className="w-full sm:h-24 md:h-64 lg:h-64 ">
                <ScrollArea className="w-full h-full border rounded-md">
                  <div className="p-4">
                    {/* <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4> */}
                    {characListData.slice(3).map((member) => (
                      <div key={member.userId}>
                        <div className="text-sm">
                          <div className="flex items-center justify-between" key={member.userId}>
                            <div className="px-1 mx-1">
                              <Avatar>
                                <AvatarImage src={member.userImage} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                            </div>

                            <div className="flex flex-col items-start w-full text-sm font-bold">
                              <div className="mx-1 text-xs ">작가명</div>
                              <div className="mx-1 text-xs break-all text-zinc-600">
                                user@gmail.com
                              </div>
                            </div>
                          </div>
                        </div>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

// export default CustomNode;
// .react-flow__node-mindmap {
//   background: white;
//   border-radius: 2px;
//   border: 1px solid transparent;
//   padding: 2px 5px;
//   font-weight: 700;
// }
