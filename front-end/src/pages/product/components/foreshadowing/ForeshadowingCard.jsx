import Check from "@/assets/Icon.svg";
import Book from "@/assets/OpenBook.svg";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFshadow } from "@/store/useFshadow";
import { Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";

export function ForeshadowingCard({ colFshadow, index }) {
  const { storyId } = useParams();
  const { fshadows, setFshadows, addStoryIdToFshadow } = useFshadow(
    (state) => ({
      fshadows: state.fshadows,
      setFshadows: state.setFshadows,
      addStoryIdToFshadow: state.addStoryIdToFshadow,
    })
  );
  const toggleStoryIdInFshadow = () => {
    console.log("사용중");
    const exists = colFshadow.storyIdList.some(
      (story) => story.storyId === storyId
    );

    const newStoryIdList = exists
      ? colFshadow.storyIdList.filter((story) => story.storyId !== storyId)
      : [...colFshadow.storyIdList, { storyId }];

    setFshadows({
      ...fshadows,
      [colFshadow.fshadowId]: {
        ...colFshadow,
        storyIdList: newStoryIdList,
      },
    });
    console.log(fshadows);
  };

  const finalButton = () => {
    console.log("회수");
  };

  return (
    
    <Card className="box-border flex flex-col w-full p-2 my-2">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex flex-row gap-3">
            <div>{colFshadow.fshadowName}</div>
            <Badge variant="outline" onClick={toggleStoryIdInFshadow}>
              사용
            </Badge>
            <Badge variant="outline" onClick={finalButton}>
              회수
            </Badge>
          </div>
          {/* //TODO delete 확인 창,api delete기능 */}
          <Trash2 size={16} onClick={() => console.log("deleted")} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex p-1 space-y-1">
          <img src={Book} className="mr-2" />
          <p className="text-sm font-medium leading-none ">
            {colFshadow.fshadowContent}
          </p>
        </div>
        <div className="flex items-center p-1 space-y-1">
          <img src={Check} className="mr-2" />
          <p className="mr-3 text-sm font-medium leading-none">
            언급된 스토리:
          </p>
          <div className="flex ">
            {colFshadow.storyIdList.map((storyOb, index) => (
              <div key={index} className="mr-3">
                {storyOb.storyId}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
