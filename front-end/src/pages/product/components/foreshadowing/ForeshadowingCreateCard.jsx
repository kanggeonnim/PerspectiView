import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFshadow } from "@/store/useFshadow";
import { useState } from "react";

export function ForeshadowingCreateCard({ className }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { triggerUpdate, setTriggerUpdate } = useFshadow((state) => ({
    triggerUpdate: state.triggerUpdate,
    setTriggerUpdate: state.setTriggerUpdate,
  }));
  // const queryClient = useQueryClient();
  //  const mutation = useMutation(
  //    (newData) => {
  //      return axios.post("주소", newData);
  //    },
  //    {
  //      onSuccess: () => {
  //        queryClient.invalidateQueries(["data"]);
  //      },
  //    }
  //  );

  const createData = () => {
    //TODO productId, fromStoryId,toStoryId
    const newData = {
      productId: "1",
      fshadowName: title,
      fshadowContent: content,
      fromStoryId: "121",
      toStoryId: "133",
    };
    //post요청
    // mutation.mutate(newData)

    // setTriggerUpdate();
  };

  return (
    <Card className="box-border flex flex-col w-full p-2 my-2">
      <CardHeader>
        <CardTitle>
          복선생성하기
          {/* TODO '복선' text 입력 위치에 제목 내용 받아와 출력 */}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">복선 타이틀</Label>
              <Input
                id="title"
                value={title}
                placeholder="복선의 타이틀을 입력하세요"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">복선 내용</Label>
              <Input
                id="content"
                value={content}
                placeholder="복선에 대해 간략히 입력하세요"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">취소</Button>
        <Button onClick={createData}>생성하기</Button>
      </CardFooter>
    </Card>
  );
}
