import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useStoryQueryModule from "@/hook/useStoryQueryModule";
import { useStoryDetail } from "@/store/useStoryDetailStore";
import { useNavigate, useParams } from "react-router-dom";
import { ForeshadowingCardStoryDetail } from "../../foreshadowing/ForeshadowingCardStoryDetail";
import { useState } from "react";

const characListData = [
  {
    characId: "1",
    characName: "whitedragon",
    characDetail: "최강 드래곤. 하얀색 드래곤이다. 다 부술 수 있다.",
    keywordList: [
      {
        keywordId: "1",
        keyword: "드래곤",
      },
      {
        keywordId: "2",
        keyword: "최강",
      },
    ],
  },
  {
    characId: "2",
    characName: "whitedragon2",
    characDetail: "최강 드래곤. 하얀색 드래곤이다. 다 부술 수 있다.",
    keywordList: [
      {
        keywordId: "1",
        keyword: "드래곤",
      },
      {
        keywordId: "2",
        keyword: "최강",
      },
    ],
  },
];

// const storyData = {
//   storyId: "111",
//   plotId: "11",
//   storyTitle: "주인공 등장",
//   storyContent: "화이트 드래곤이 울부짖었다 크아아앙",
//   characList: [
//     {
//       id: "1",
//       imgUrl:
//         "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
//     },
//     {
//       id: "2",
//       imgUrl: "https://github.com/shadcn.png",
//     },
//   ],
//   position_x: 0.0,
//   position_y: 10.0,
// };

const getCharacName = (characId) => {
  const result = characListData.filter((charac) => charac.characId === characId);
  return result[0].characName;
};

export default function StoryDetail() {
  const { teamId, productId, plotId, storyId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const {
    getStoryDetail,
    getStoryDetailIsSuccess,
    getStoryFshadowList,
    getStoryFshadowListIsSuccess,
  } = useStoryQueryModule(teamId, productId, plotId, storyId);
  const { storyFshadowList, setStoryDetail, setStoryFshadowList } = useStoryDetail();
  const { storyDetail } = useStoryDetail();
  console.log("여기!!", getStoryFshadowList);

  if (!getStoryDetailIsSuccess || !storyDetail) {
    return <div>Loading...</div>;
  }
  return (
    <Card className="w-1/2 h-full m-5 ">
      <form action="" method="" className="flex flex-col w-full h-full ">
        <CardHeader>
          {/* 스토리 제목 */}
          <CardTitle className="flex w-full my-2 text-3xl">{storyDetail.storyTitle}</CardTitle>

          {/* 복선 */}
          <div className="flex flex-col justify-between">
            <div className="my-2 text-xs font-bold">이 스토리에 사용된 복선</div>
            <div className="flex items-start justify-start space-x-2">
              {storyFshadowList?.map((fshadow) => (
                <HoverCard key={fshadow.fshadowId}>
                  <HoverCardTrigger>
                    <Badge>{fshadow.fshadowName}</Badge>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <ForeshadowingCardStoryDetail colFshadow={fshadow} />
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>

          {/* 인물 목록 */}
          <div className="flex flex-col justify-between ">
            <div className="my-2 text-xs font-bold ">이 스토리에 등장한 인물</div>
            <div className="flex items-start justify-start space-x-2">
              {storyDetail.characters?.map((character) => (
                <div className="flex flex-col items-center " key={character.id}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar>
                          <AvatarImage src={character.image} alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p> {character.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex w-full h-full">
          <div className="flex flex-col justify-start w-full h-full ">
            <Textarea className="w-full h-full text-lg" defaultValue={storyDetail.storyContent} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <div className="flex m-4 ">
            {isEdit ? (
              <>
                <Button
                  type="button"
                  className="w-full mx-2 shadow-sm bg-secondary text-secondary-foreground hover:bg-secondary-accent"
                  variant="outline"
                  onClick={() => setIsEdit(false)}
                >
                  취소
                </Button>
                <Button
                  className="w-full mx-2"
                  variant="default"
                  type="button"
                  onClick={() => console.log("submit")}
                >
                  등록
                </Button>
              </>
            ) : (
              <Button
                className="w-full mx-2"
                variant="default"
                type="button"
                onClick={() => setIsEdit(true)}
              >
                수정
              </Button>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
