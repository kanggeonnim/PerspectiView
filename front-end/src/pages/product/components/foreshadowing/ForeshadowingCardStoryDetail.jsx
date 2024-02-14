import check_icon from "@/assets/check_icon.svg";
import book_icon from "@/assets/opened_book.svg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useFshadowQueryModule from "@/hook/useFshadowQueryModule";
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
    <Card className="box-border flex flex-col w-full p-2 my-2">
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
        <div className="flex p-1 space-y-1">
          <img src={book_icon} className="mr-2" />
          {isEditMode ? (
            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          ) : (
            <p className="text-sm font-medium leading-none ">{colFshadow.fshadowContent}</p>
          )}
        </div>
        <div className="flex items-center p-1 space-y-1">
          <img src={check_icon} className="mr-2" />
          <p className="mr-3 text-sm font-medium leading-none">언급한 스토리 ID:</p>
          <div className="flex ">
            {colFshadow.storyIdList?.map((storyOb, index) => (
              <div key={index} className="mr-3">
                <Link
                  to={`/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyOb.storyId}`}
                >
                  {storyOb.storyId}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center p-1 space-y-1">
          <img src={check_icon} className="mr-2" />
          <p className="mr-3 text-sm font-medium leading-none">회수한 스토리 ID:</p>
          <div className="flex ">
            <Link
              to={`/team/${teamId}/product/${productId}/plot/${plotId}/story/${colFshadow.fshadowClose}`}
            >
              {colFshadow.fshadowClose}
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
