import check_icon from "@/assets/check_icon.svg";
import book_icon from "@/assets/opened_book.svg";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useFshadowQueryModule from "@/hook/useFshadowQueryModule";
import { useFshadow } from "@/store/useFshadow";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function ForeshadowingCard({ colFshadow, index }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(colFshadow.fshadowName);
  const [editContent, setEditContent] = useState(colFshadow.fshadowContent);
  const { teamId, productId, plotId, storyId } = useParams();
  const fshadowId = colFshadow.fshadowId;
  const {
    deleteFshadow,
    updateFshadow,
    dropFshadow,
    undropFshadow,
    closeFshadow,
  } = useFshadowQueryModule(teamId, productId, fshadowId, plotId, storyId);
  const { fshadows, setFshadows } = useFshadow((state) => ({
    fshadows: state.fshadows,
    setFshadows: state.setFshadows,
  }));
  const isDropped = colFshadow.storyIdList.some(
    (storyIdObject) => storyIdObject.storyId == storyId
  );

  //console test
  console.log("복선", colFshadow, colFshadow.columnId);

  const handleEditSubmit = () => {
    updateFshadow({
      id: fshadowId,
      fshadowName: editName,
      fshadowContent: editContent,
    });
    console.log("수정 요청:", fshadowId, editName, editContent);
    setIsEditMode(false);
  };

  //TODO StoryIdList/fshadowClose를 참고해서 badge표시 상태 변경
  return (
    <Card className="box-border flex flex-col w-full p-2 my-2">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex flex-row gap-3">
            {isEditMode ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            ) : (
              <div>{colFshadow.fshadowName}</div>
            )}
            {isDropped ? (
              <Badge variant="outline" onClick={() => undropFshadow()}>
                사용 중
              </Badge>
            ) : (
              <Badge variant="outline" onClick={() => dropFshadow()}>
                사용
              </Badge>
            )}
            <Badge variant="outline" onClick={() => closeFshadow()}>
              회수
            </Badge>
          </div>
          {/* //TODO delete 확인 창,api delete기능 */}
          <Trash2 size={16} onClick={deleteFshadow} />
          {!isEditMode && (
            <Pencil size={16} onClick={() => setIsEditMode(true)} />
          )}
          <button onClick={handleEditSubmit}>수정 완료</button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex p-1 space-y-1">
          <img src={book_icon} className="mr-2" />
          {isEditMode ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          ) : (
            <p className="text-sm font-medium leading-none ">
              {colFshadow.fshadowContent}
            </p>
          )}
        </div>
        <div className="flex items-center p-1 space-y-1">
          <img src={check_icon} className="mr-2" />
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
        <div className="flex items-center p-1 space-y-1">
          <img src={check_icon} className="mr-2" />
          <p className="mr-3 text-sm font-medium leading-none">회수 스토리:</p>
          <div className="flex ">{colFshadow.fshadowClose}</div>
        </div>
      </CardContent>
    </Card>
  );
}
