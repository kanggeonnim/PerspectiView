import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TagsInput } from "@ark-ui/react";

export default function TeamCreate() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="my-3">
          <DialogTitle>팀 생성하기</DialogTitle>
          <DialogDescription>
            작품을 공유할 수 있는 팀을 생성해보세요.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="teamName" className="">
              팀명
            </Label>
            <Input id="teamName" placeholder="팀명을 입력하세요" className="" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="teamInfo" className="">
              팀 소개
            </Label>
            <Textarea
              id="teamInfo"
              placeholder="팀에 대한 설명을 입력해주세요(선택)"
              className="h-24"
            />
          </div>
          {/* //TODO 엔터치면 배지만들어지는것 */}
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="addMemember" className="">
              팀원 추가
            </Label>
            {/* <div>
            <Input
              id="addMemember"
              placeholder="팀원 추가"
              className=""
            />
            <Badge className="flex items-center justify-between">
              gkdrhd6788@gmail.com
              <X size={16} strokeWidth={1} className="" />
            </Badge>
            </div> */}
<TagsInput.Root addOnPaste delimiter=",">
      {(api) => (
        <>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            {api.value.map((value, index) => (
              <TagsInput.Item key={index} index={index} value={value}>
                <TagsInput.ItemInput />
                <TagsInput.ItemText>{value}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
              </TagsInput.Item>
            ))}
          </TagsInput.Control>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">팀 생성</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
