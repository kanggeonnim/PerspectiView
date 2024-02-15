import check_icon from "@/assets/check_icon.svg";
import book_icon from "@/assets/opened_book.svg";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useFshadowQueryModule from "@/hook/useFshadowQueryModule";
import { Goal } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export function ForeshadowingCardStoryDetail({ colFshadow, index }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(colFshadow.fshadowName);
  const [editContent, setEditContent] = useState(colFshadow.fshadowContent);
  const { teamId, productId, plotId, storyId } = useParams();
  const fshadowId = colFshadow.fshadowId;
  const { deleteFshadow, updateFshadow } = useFshadowQueryModule(
    teamId,
    productId,
    fshadowId,
    plotId,
    storyId
  );
  // const { fshadows, setFshadows } = useFshadow((state) => ({
  //   fshadows: state.fshadows,
  //   setFshadows: state.setFshadows,
  // }));

  const handleEditSubmit = () => {
    updateFshadow({
      id: fshadowId,
      fshadowName: editName,
      fshadowContent: editContent,
    });
    // console.log("수정 요청:", fshadowId, editName, editContent);
    setIsEditMode(false);
  };

  return (
    <Card className="box-border flex flex-col w-full p-1 my-2">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex flex-row gap-3">
            {isEditMode ? (
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
            ) : (
              <div>{colFshadow.fshadowName}</div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start space-y-1 ">
          <img src={book_icon} className="mr-2" />
          {isEditMode ? (
            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          ) : (
            <p className="text-sm font-medium leading-normal break-all">
              {colFshadow.fshadowContent}
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row items-center justify-start">
            <img src={check_icon} className="mr-2" />
            <p className="text-sm font-bold leading-3">사용한 스토리</p>
          </div>
          <div className="flex flex-wrap ml-8 w-fit">
            {colFshadow.storyIdList?.map((storyOb, index) => (
              <Badge
                key={index}
                variant="destructive"
                className="my-1 mr-1 cursor-pointer hover:bg-destructive-accent"
              >
                <Link
                  to={`/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyOb.storyId}`}
                >
                  {storyOb.storyTitle.length > 6
                    ? storyOb.storyTitle?.slice(0, 6) + "..."
                    : storyOb.storyTitle}
                </Link>
              </Badge>
            ))}
          </div>
        </div>
        {!(colFshadow.fshadowClose == null) && (
          <div className="flex flex-col items-start space-y-1">
            <div className="flex flex-row items-center">
              <Goal color="#19ae2a" strokeWidth={2} className="mr-2" />
              <p className="text-sm font-bold leading-3">회수한 스토리</p>
            </div>
            <Badge
              key={index}
              variant="off"
              className="ml-8 cursor-pointer hover:bg-secondary-accent"
              onClick={() => console.log(colFshadow)}
            >
              <Link
                to={`/team/${teamId}/product/${productId}/plot/${plotId}/story/${colFshadow.fshadowClose}`}
              >
                {colFshadow.storyIdList.map((story) => {
                  if (story.storyId === colFshadow.fshadowClose) {
                    return (
                      <div key={story.storyId}>
                        {story.storyTitle.length > 6
                          ? story.storyTitle?.slice(0, 6) + "..."
                          : story.storyTitle}
                      </div>
                    );
                  }
                  return null;
                })}
              </Link>
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
