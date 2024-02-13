import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MinusCircle, MoreHorizontal, PlusCircle } from "lucide-react";
import { Handle, Position, useStore } from "reactflow";
import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import useStoryQueryModule from "@/hook/useStoryQueryModule";

// TODO: 플롯으로 스토리 조회 API 호출 시 charaList에 id, 이름, 이미지 와야 됨
const characListData = [
  {
    characterId: 1,
    characterName: "whitedragon",
    img: `https://github.com/shadcn.png`,
  },
  ...Array.from({ length: 10 }, (_, index) => ({
    characterId: index + 2,
    characterName: "등장인물 이름",
    img: `https://ui.shadcn.com/avatars/0${index + 1}.png`,
  })),
];

const zoomSelector = (s) => s.transform[2] >= 1.5;

const CustomNode = memo(function CustomNode({ id, data, type }) {
  const navigate = useNavigate();
  const { teamId, productId } = useParams();
  const showContent = useStore(zoomSelector);

  const { createStory } = useStoryQueryModule(teamId, productId, data.plotId);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        className="flex items-center justify-center w-32 h-40 p-4 border rounded "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: showContent || type === "empty" ? "transparent" : `${data.borderColor}`,
          borderStyle: type === "empty" ? "dashed" : "solid",
          opacity: type === "empty" ? 0.3 : 1,
          borderWidth: type === "empty" ? "5px" : "2px",
          borderColor: `${data.borderColor}`,
        }}
      >
        <div className={`absolute m-1 top-0 right-0  ${isHovered ? "visible" : "hidden"}`}>
          <Button
            size="sm"
            className="h-full p-1 rounded-full bg-secondary-accent"
            onClick={() => {}}
          >
            <MinusCircle size={15} className="mx-auto text-foreground" />
          </Button>
        </div>
        {showContent && <div className="text-center">{data.title}</div>}

        {type === "empty" && (
          <Button
            className="bg-transparent border-none shadow-none hover:bg-transparent"
            onClick={() => {
              createStory({
                storyTitle: "",
                storyContent: "",
                characters: [],
                foreShadowings: [],
                positionX: 1,
                positionY: 0,
              });
            }}
          >
            <PlusCircle size={30} className="mx-auto text-black" />
          </Button>
        )}
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>

      {/* 스토리별 등장인물 목록 */}
      {showContent && (
        <div className="absolute w-[120px] mt-2">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center">
                {data.characters?.slice(0, 3).map((charac) => (
                  <Avatar key={charac.characterId} className="-ml-3">
                    <AvatarImage src={charac.characImage} alt="@shadcn" />
                    <AvatarFallback>{charac.characterName?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                ))}
                {data.characters && data.characters.length > 3 && <MoreHorizontal />}
              </div>
            </PopoverTrigger>
            <PopoverContent className="mt-3 w-60" side="bottom">
              <div className="mb-6 space-y-2">
                <h4 className="text-xl font-bold leading-none">스토리 내 등장인물</h4>
              </div>

              <div className="w-full sm:h-24 md:h-64 lg:h-64 ">
                <ScrollArea className="w-full h-full rounded-md">
                  {data.characters?.map((charac) => (
                    <div key={charac.characterId}>
                      <div className="text-sm">
                        <div className="flex items-center justify-between" key={charac.characterId}>
                          <div className="">
                            <Avatar>
                              <AvatarImage src={charac.characImage} alt="@shadcn" />
                              <AvatarFallback>{charac.characterName?.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex flex-col items-start w-full font-bold">
                            <div className="mx-3 text-lg ">{charac.characterName}</div>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );
});

export default CustomNode;

// export default CustomNode;
// .react-flow__node-mindmap {
//   background: white;
//   border-radius: 2px;
//   border: 1px solid transparent;
//   padding: 2px 5px;
//   font-weight: 700;
// }
