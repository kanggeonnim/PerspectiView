import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useStoryQueryModule from "@/hook/useStoryQueryModule";
import { useStoryDetailStore } from "@/store/useStoryDetailStore";
import { useNavigate, useParams } from "react-router-dom";
import { ForeshadowingCardStoryDetail } from "../../foreshadowing/ForeshadowingCardStoryDetail";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreHorizontal } from "lucide-react";

// const sample = Array.from({ length: 20 }, (_, index) => ({
//   fshadowId: index + 1,
//   fshadowName: "보물상자",
//   fshadowContent:
//     "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
// }));

export default function StoryDetail() {
  const { teamId, productId, plotId, storyId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const { storyDetail, storyFshadowList, setStoryDetail, setStoryFshadowList } =
    useStoryDetailStore();

  const {
    getStoryDetailData,
    getStoryDetailDataIsSuccess,
    getStoryFshadowListData,
    getStoryFshadowListDataIsSuccess,
    updateStory,
  } = useStoryQueryModule(teamId, productId, plotId, storyId);
  console.log("여기!!", getStoryFshadowListData);

  console.log("input", storyDetail);
  if (!getStoryDetailDataIsSuccess || !storyDetail) {
    return <div>Loading...</div>;
  }
  return (
    <Card className="w-1/2 h-full m-5 ">
      <CardHeader className="min-w-full p-0">
        {/* 스토리 제목 */}
        <CardTitle className="flex w-full p-0 my-2 text-3xl ">
          {isEdit ? (
            <Input
              type="text"
              className="text-3xl"
              value={storyDetail.storyTitle}
              onChange={(e) => {
                setStoryDetail({ ...storyDetail, storyTitle: e.target.value });
                console.log(e.target.value);
              }}
            />
          ) : (
            <div>{storyDetail.storyTitle}</div>
          )}
        </CardTitle>

        <div className="flex justify-start ml-1">
          {/* 복선 */}
          <div className="flex flex-col justify-between w-1/2 ">
            <div className="my-2 text-xs font-bold">이 스토리에 사용된 복선</div>
            <div className="flex flex-wrap items-start justify-start ">
              {storyFshadowList?.slice(0, 5)?.map((fshadow) => (
                <HoverCard key={fshadow.fshadowId}>
                  <HoverCardTrigger className="mr-1">
                    <Badge
                      variant="destructive"
                      className="cursor-pointer hover:bg-destructive-accent"
                    >
                      {fshadow.fshadowName}
                    </Badge>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <ForeshadowingCardStoryDetail colFshadow={fshadow} />
                  </HoverCardContent>
                </HoverCard>
              ))}
              <div className="mx-2">{storyFshadowList?.length > 9 && <MoreHorizontal />}</div>
            </div>
          </div>

          {/* 인물 목록 */}
          <div className="flex flex-col justify-between w-1/2 ">
            <div className="my-2 text-xs font-bold ">이 스토리에 등장한 인물</div>
            <div className="flex items-start justify-start space-x-2">
              {storyDetail.characters?.map((character) => (
                <div className="flex flex-col items-center " key={character.characterId}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar>
                          <AvatarImage src={character.characterImage} alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p> {character.characterName}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex w-full p-0 my-5 border rounded-md h-fit">
        <div className="flex flex-col justify-start w-full h-full ">
          <ScrollArea className="h-72">
            {isEdit ? (
              <Textarea
                className="w-full text-lg h-72"
                value={storyDetail.storyContent}
                onChange={(e) => {
                  setStoryDetail({ ...storyDetail, storyContent: e.target.value });
                }}
              />
            ) : (
              <div className="w-full h-full p-3 ">{storyDetail.storyContent}</div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-0 mr-2 ">
        {isEdit ? (
          <>
            <Button
              className="mx-2 shadow-sm bg-secondary text-secondary-foreground hover:bg-secondary-accent"
              variant="outline"
              onClick={() => setIsEdit(false)}
            >
              취소
            </Button>
            <Button
              className="mx-2 "
              variant="default"
              onClick={() => {
                updateStory(storyDetail);
                setIsEdit(false);
              }}
            >
              등록
            </Button>
          </>
        ) : (
          <Button
            className="mx-2 "
            variant="default"
            onClick={() => {
              setIsEdit(true);
              setStoryDetail(storyDetail);
            }}
          >
            수정
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
