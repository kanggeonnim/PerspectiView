import check_icon from "@/assets/check_icon.svg";
import book_icon from "@/assets/opened_book.svg";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFshadowQueryModule from "@/hook/useFshadowQueryModule";
import { useFshadow } from "@/store/useFshadow";
import { CheckCircle, Goal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export function ForeshadowingCard({ colFshadow, index }) {
  const location = useLocation();
  const isFshadowMainTab = location.pathname.endsWith("/foreshadowing");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(colFshadow.fshadowName);
  const [editContent, setEditContent] = useState(colFshadow.fshadowContent);
  const { teamId, productId, plotId, storyId } = useParams();
  const fshadowId = colFshadow.fshadowId;
  const { deleteFshadow, updateFshadow, dropFshadow, undropFshadow, closeFshadow, uncloseFshadow } =
    useFshadowQueryModule(teamId, productId, fshadowId, plotId, storyId);
  const { fshadows, setFshadows } = useFshadow((state) => ({
    fshadows: state.fshadows,
    setFshadows: state.setFshadows,
  }));

  //해당 스토리 내에서 사용되었는지 여부
  const isDropped = colFshadow.storyIdList.some(
    (storyIdObject) => storyIdObject.storyId == storyId
  );

  // console.log("여기", colFshadow.columnId);

  //해당 스토리 내에서 회수되었는지 여부
  const isClose = colFshadow.fshadowClose == storyId;

  // console.log("복선", colFshadow, colFshadow.columnId);

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
    <Card className="box-border flex flex-col w-full my-2 border border-inherit ">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-3 ">
            <div className="flex flex-row items-center justify-between">
              {isEditMode ? (
                <Input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full"
                />
              ) : (
                <div>{colFshadow.fshadowName}</div>
              )}
              <div className="flex">
                {!isEditMode ? (
                  <Pencil
                    className="mx-2 cursor-pointer"
                    size={16}
                    onClick={() => setIsEditMode(true)}
                  />
                ) : (
                  // <Button onClick={handleEditSubmit}>수정 완료</Button>
                  <CheckCircle
                    size={16}
                    strokeWidth={1.25}
                    className="mx-1"
                    onClick={handleEditSubmit}
                  />
                )}
                {colFshadow.columnId === "column-1" && (
                  <Trash2 className="cursor-pointer" size={16} onClick={deleteFshadow} />
                )}
              </div>
            </div>
            {!isFshadowMainTab && (
              <div className="flex flex-row gap-2">
                {!isDropped && colFshadow.columnId !== "column-3" && (
                  <Badge
                    className="cursor-pointer hover:bg-unused"
                    variant="outline"
                    onClick={() => dropFshadow()}
                  >
                    사용
                  </Badge>
                )}
                {isDropped &&
                  colFshadow.columnId !== "column-1" &&
                  colFshadow.columnId !== "column-3" && (
                    <Badge
                      className="border cursor-pointer hover:bg-secondary-accent"
                      variant="outline"
                      onClick={() => undropFshadow()}
                    >
                      사용취소
                    </Badge>
                  )}
                {!isClose && colFshadow.columnId === "column-2" && (
                  <Badge
                    className="cursor-pointer hover:bg-accent"
                    variant="outline"
                    onClick={() => closeFshadow()}
                  >
                    회수
                  </Badge>
                )}
                {isClose && colFshadow.columnId === "column-3" && (
                  <Badge
                    className="cursor-pointer hover:bg-secondary-accent"
                    variant="outline"
                    onClick={() => uncloseFshadow()}
                  >
                    회수취소
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex p-1 space-y-1">
          <img src={book_icon} className="mr-2" />
          {isEditMode ? (
            <Textarea
              value={editContent}
              className="w-full"
              onChange={(e) => setEditContent(e.target.value)}
            />
          ) : (
            <p className="text-sm font-medium leading-none ">{colFshadow.fshadowContent}</p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row items-center justify-start">
            <img src={check_icon} className="mr-2" />
            <p className="text-sm font-medium leading-none">사용한 스토리</p>
          </div>
          <div className="flex ml-8 ">
            {colFshadow.storyIdList?.map((storyOb, index) => (
              <Badge
                key={index}
                variant="destructive"
                className="mr-1 cursor-pointer hover:bg-destructive-accent"
              >
                <Link
                  to={`/team/${teamId}/product/${productId}/plot/${plotId}/story/${storyOb.storyId}`}
                >
                  {storyOb.storyId}
                </Link>
              </Badge>
            ))}
          </div>
        </div>
        {!(colFshadow.fshadowClose == null) && (
          <div className="flex flex-col items-start space-y-1">
            <div className="flex flex-row items-center">
              <Goal color="#19ae2a" strokeWidth={2} className="mr-2" />
              <p className="text-sm font-medium leading-none">회수한 스토리</p>
            </div>
            <Badge
              key={index}
              variant="destructive"
              className="ml-8 cursor-pointer hover:bg-destructive-accent"
            >
              <Link
                to={`/team/${teamId}/product/${productId}/plot/${plotId}/story/${colFshadow.fshadowClose}`}
              >
                {colFshadow.fshadowClose}
              </Link>
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
