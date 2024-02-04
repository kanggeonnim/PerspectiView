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
import { Plus, PlusCircle, X } from "lucide-react";

export default function TeamCreate() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PlusCircle
          strokeWidth={2.5}
          className="p-1 rounded-sm text-primary hover:bg-secondary-accent"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="my-3">
          <DialogTitle>팀 생성하기</DialogTitle>
          <DialogDescription>작품을 공유할 수 있는 팀을 생성해보세요.</DialogDescription>
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
          {/* <div className="flex flex-col gap-y-2">
            <Label htmlFor="addMemember" className="">
              팀원 추가
            </Label>
            <div>
            <Input
              id="addMemember"
              placeholder="팀원 추가"
              className=""
            />
            <Badge className="flex items-center justify-between">
              gkdrhd6788@gmail.com
              <X size={16} strokeWidth={1} className="" />
            </Badge>
            </div>
          </div> */}
          {/* //TODO 폰트맞추기, 수정기능이상한거고치기 중복일때 */}
          <TagsInput.Root
            validate={(details) => {
              return !details.value.includes(details.inputValue);
            }}
          >
            {(api) => (
              <div className="flex flex-col gap-3">
                <TagsInput.Label>팀원 추가하기</TagsInput.Label>
                <div className="flex flex-col gap-3">
                  <TagsInput.Control className="flex flex-wrap gap-3">
                    {api.value.map((value, index) => (
                      <TagsInput.Item
                        className="flex items-center border rounded-lg"
                        key={index}
                        index={index}
                        value={value}
                      >
                        <TagsInput.ItemText className="p-2">{value}</TagsInput.ItemText>
                        <TagsInput.ItemDeleteTrigger className="p-1">
                          <X size={20} strokeWidth={1} />
                        </TagsInput.ItemDeleteTrigger>
                      </TagsInput.Item>
                    ))}
                  </TagsInput.Control>
                  <div className="border rounded-lg w-80">
                    <TagsInput.Input
                      className="w-full h-full p-2 rounded-lg"
                      placeholder="  팀원 이메일을 추가하세요"
                    />
                  </div>
                </div>
              </div>
            )}
          </TagsInput.Root>
        </div>
        <DialogFooter>
          <Button type="submit">팀 생성</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
