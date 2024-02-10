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
  const { teamId, productId } = useParams();
  const { storyId } = useParams();
  console.log("복선", colFshadow);
  const fshadowId = colFshadow.fshadowId;
  const { deleteFshadow, updateFshadow } = useFshadowQueryModule(
    teamId,
    productId,
    fshadowId
  );
  const { fshadows, setFshadows } = useFshadow((state) => ({
    fshadows: state.fshadows,
    setFshadows: state.setFshadows,
  }));

  const handleEditSubmit = () => {
    updateFshadow({
      id: fshadowId,
      fshadowName: editName,
      fshadowContent: editContent,
    });
    console.log("수정 요청:", fshadowId, editName, editContent);
    setIsEditMode(false);
  };

  // 토글 복선 사용 버튼
  const toggleStoryIdInFshadow = () => {
    console.log("사용중");
    // 해당 복선의 storyIdList에 현재 storyId가 있는지 확인(boolean)
    const exists = colFshadow.storyIdList.some(
      (story) => story.storyId === storyId
    );

    // true이면 현재 storyId제거, false이면 storyId 추가
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

  // 토글 복선 회수 버튼
  const finalButton = () => {
    let newFshadowClose;
    if (colFshadow.fshadowClose) {
      newFshadowClose = null;
    } else {
      newFshadowClose = storyId;
    }
    setFshadows({
      ...fshadows,
      [colFshadow.fshadowId]: {
        ...colFshadow,
        fshadowClose: newFshadowClose,
      },
    });
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
            <Badge variant="outline" onClick={toggleStoryIdInFshadow}>
              사용
            </Badge>
            <Badge variant="outline" onClick={finalButton}>
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
