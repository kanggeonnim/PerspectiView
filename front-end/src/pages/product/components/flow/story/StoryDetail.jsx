import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useStoryQueryModule from "@/hook/useStoryQueryModule";
import { useCharacterListStore } from "@/store/character/useCharacterListStore";
import { useStoryDetailStore } from "@/store/story/useStoryDetailStore";
import { MinusCircle, MoreHorizontal, PlusCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ForeshadowingCardStoryDetail } from "../../foreshadowing/ForeshadowingCardStoryDetail";
import { useFshadow } from "@/store/useFshadow";

// const sample = Array.from({ length: 20 }, (_, index) => ({
//   fshadowId: index + 1,
//   fshadowName: "보물상자",
//   fshadowContent:
//     "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
// }));

export default function StoryDetail() {
  const { teamId, productId, plotId, storyId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const { fshadows, setFshadows } = useFshadow();

  const { storyDetail, storyFshadowList, setStoryDetail } = useStoryDetailStore();
  const {
    // getStoryDetailData,
    // getStoryDetailDataIsSuccess,
    // isStoryDetailDataLoading,
    getStoryFshadowListData,
    // getStoryFshadowListDataIsSuccess,
    updateStory,
    addCharacter,
    removeCharacter,
  } = useStoryQueryModule(teamId, productId, plotId, storyId);

  const [searchInput, setSearchInput] = useState("");
  const [characterListInStory, setCharacterListInStory] = useState();
  const { characterList } = useCharacterListStore();
  // console.log("여기!!", getStoryFshadowListData);

  const memoizedSetCharacterListInStory = useMemo(() => setCharacterListInStory, []);

  const handleChange = useMemo(() => {
    console.log("eeee");
    return (event) => {
      setSearchInput(event.target.value);
      console.log("input", event.target.value);
    };
  }, []);

  useEffect(() => {
    console.log("character", characterList);
    if (storyDetail && storyDetail.characters) setCharacterListInStory([...storyDetail.characters]);
    console.log("detail render", storyDetail);
  }, [storyDetail, storyDetail?.characters, characterList]);

  useEffect(() => {
    console.log("in story", characterListInStory);
    console.log("fsadow", storyDetail.foreShadowings);
  }, [characterListInStory, storyFshadowList]);

  if (!storyDetail) {
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
            <div className="my-2 text-sm font-bold">이 스토리에 사용된 복선</div>
            <div className="flex flex-wrap items-start justify-start ">
              {getStoryFshadowListData?.slice(0, 5)?.map((fshadow) => (
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
              <div className="mx-2">
                {storyDetail.foreShadowings?.length > 9 && <MoreHorizontal />}
              </div>
            </div>
          </div>
          {/* 인물 목록 */}
          <div className="flex flex-col justify-between w-1/2 ">
            <div className="flex items-center my-2 ">
              <div className="text-sm font-bold ">이 스토리에 등장한 인물</div>
              {isEdit && (
                <Popover onOpenChange={() => setSearchInput("")}>
                  <PopoverTrigger asChild>
                    <PlusCircle size={15} className="mx-1 text-primary" />
                  </PopoverTrigger>
                  <PopoverContent className="h-60 w-80" side="right">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">인물 목록</h4>
                        <div className="flex ">
                          <Input
                            className="w-4/5 mr-1 rounded-lg"
                            value={searchInput}
                            onChange={handleChange}
                          />
                          <Button>검색</Button>
                        </div>
                        <ScrollArea className="border rounded h-36">
                          {characterList?.map((character) => (
                            <div
                              key={character.characterId}
                              className="m-1 cursor-pointer"
                              onClick={() => {
                                characterListInStory.push(character);
                                setCharacterListInStory([...characterListInStory]);
                              }}
                            >
                              <div className="text-sm">
                                <div
                                  className="flex items-center justify-between"
                                  key={character.characterId}
                                >
                                  <div className="">
                                    <Avatar>
                                      <AvatarImage src={character.characImage} alt="@shadcn" />
                                      <AvatarFallback>
                                        {character.characterName?.slice(0, 2)}
                                      </AvatarFallback>
                                    </Avatar>
                                  </div>
                                  <div className="flex flex-col items-start w-full font-regular">
                                    <div className="mx-3 text-lg ">{character.characterName}</div>
                                  </div>
                                </div>
                              </div>
                              <Separator className="my-2" />
                            </div>
                          ))}
                        </ScrollArea>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <div className="flex items-start justify-start space-x-2">
              {isEdit ? (
                <>
                  {characterListInStory &&
                    characterListInStory.map((character) => (
                      <div
                        className="relative flex flex-col items-center "
                        key={character.characterId}
                      >
                        <Avatar>
                          <AvatarImage src={character.characterImage} alt="@shadcn" />
                          <AvatarFallback>{character.characterName?.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <Badge variant="secondary" radius="sm">
                          {character.characterName}
                        </Badge>
                        <MinusCircle
                          size={13}
                          className="absolute right-0 mr-1 text-red-500 "
                          onClick={() => {
                            setCharacterListInStory([
                              ...characterListInStory.filter(
                                (charac) => charac.characterId !== character.characterId
                              ),
                            ]);
                          }}
                        />
                      </div>
                    ))}
                </>
              ) : (
                <>
                  {characterListInStory &&
                    characterListInStory.map((character) => (
                      <div className="flex flex-col items-center" key={character.characterId}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Avatar>
                                <AvatarImage src={character.characterImage} alt="@shadcn" />
                                <AvatarFallback>
                                  {character.characterName?.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p> {character.characterName}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                </>
              )}
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
                value={storyDetail.storyContent.content ? storyDetail.storyContent.content : ""}
                onChange={(e) => {
                  setStoryDetail({ ...storyDetail, storyContent: { content: e.target.value } });
                }}
              />
            ) : (
              <div className="w-full h-full p-3 ">{storyDetail.storyContent?.content}</div>
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
                const addedValues = characterListInStory.filter(
                  (item) => !storyDetail.characters.includes(item)
                );
                const removedValues = storyDetail.characters.filter(
                  (item) => !characterListInStory.includes(item)
                );

                console.log("added", addedValues);
                console.log("removed", removedValues);

                addedValues.map((value) => {
                  addCharacter(value);
                });

                removedValues.map((value) => {
                  removeCharacter(value.characterId);
                });
                updateStory({
                  storyTitle: storyDetail.storyTitle,
                  storyContent: { content: storyDetail.storyContent.content },
                });
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
