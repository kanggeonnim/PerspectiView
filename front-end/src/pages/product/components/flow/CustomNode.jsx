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

const zoomSelector = (s) => s.transform[2] >= 1.5;

const CustomNode = memo(function CustomNode({ id, data, type }) {
  const navigate = useNavigate();
  const { teamId, productId } = useParams();
  const showContent = useStore(zoomSelector);

  const { createStory, deleteStory } = useStoryQueryModule(teamId, productId, data.plotId);
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
          {type === "story" && (
            <Button
              size="sm"
              className="h-full p-1 bg-transparent rounded-full shadow-none hover:bg-transparent hover:shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                deleteStory(data.storyId);
              }}
            >
              <MinusCircle size={15} className="mx-auto text-destructive" />
            </Button>
          )}
        </div>
        {showContent && (
          <div className="text-center break-words break-all whitespace-pre-wrap">{data.title}</div>
        )}

        {type === "empty" && (
          <Button
            className="w-full h-full p-0 m-0 bg-transparent shadow-none hover:bg-transparent"
            onClick={() => {
              createStory({
                storyTitle: "스토리 제목을 입력하세요.",
                storyContent: { content: "" },
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
                    <AvatarImage src={charac.characterImage} alt="@shadcn" />
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
                              <AvatarImage src={charac.characterImage} alt="@shadcn" />
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
