import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useTeamQueryModule from "@/hook/useTeamQueryModule";
import { TagsInput } from "@ark-ui/react";
import { PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

// TODO: Dialog 화면 비율에 따라서 스크롤바 생기도록 수정
// TODO: 팀 추가 ui 수정
export default function TeamCreate() {
  const { createTeam } = useTeamQueryModule();
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [emailList, setEmailList] = useState([]);
  // const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    console.log("emailList", emailList);
  }, [emailList]);
  // const handleAddEmail = () => {
  //   if (newEmail && !emailList.value?.includes(newEmail)) {
  //     setEmailList([...emailList, newEmail]);
  //     setNewEmail("");
  //   }
  // };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <PlusCircle
          strokeWidth={2.5}
          className="p-1 rounded-sm text-primary hover:bg-secondary-accent"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[800px]">
        <AlertDialogHeader className="my-3">
          <AlertDialogTitle>팀 생성</AlertDialogTitle>
          <AlertDialogDescription>작품을 공유할 수 있는 팀을 생성해보세요.</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="teamName" className="">
              팀명
            </Label>
            <Input
              value={title}
              id="teamName"
              placeholder="팀명을 입력하세요"
              className=""
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="teamInfo" className="">
              팀 소개
            </Label>
            <Textarea
              id="teamInfo"
              value={info}
              placeholder="팀에 대한 설명을 입력해주세요(선택)"
              className="h-24"
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>

          <TagsInput.Root
            value={emailList}
            onValueChange={setEmailList}
            validate={(details) => {
              return !details.value.includes(details.inputValue);
            }}
          >
            {(api) => (
              <div className="flex flex-col gap-3">
                <Label className="font-md">팀원 추가 </Label>
                {/* <TagsInput.Label>팀원 추가하기</TagsInput.Label> */}
                <div className="flex flex-col gap-3">
                  <TagsInput.Control className="flex flex-wrap gap-3">
                    {api.value.map((value, index) => (
                      <TagsInput.Item
                        className=" rounded-full inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-badge-accent text-primary-foreground shadow hover:bg-primary/80"
                        key={index}
                        index={index}
                        value={value}
                      >
                        <TagsInput.ItemText className="p-1">{value}</TagsInput.ItemText>
                        <TagsInput.ItemDeleteTrigger className="p-1">
                          <X size={20} strokeWidth={1} />
                        </TagsInput.ItemDeleteTrigger>
                      </TagsInput.Item>
                    ))}
                  </TagsInput.Control>
                  <div className="flex flex-row items-center rounded-lg w-80">
                    <TagsInput.Input
                      className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-sm h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="ssafy@ssafy.com"
                      // value={newEmail}
                      // onChange={(e) => setNewEmail(e.target.value)}
                    />
                    {/* <Button className="mx-3" onClick={handleAddEmail}>
                      추가
                    </Button> */}
                  </div>
                </div>
              </div>
            )}
          </TagsInput.Root>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="shadow-sm bg-secondary text-secondary-foreground hover:bg-secondary-accent">
            취소
          </AlertDialogCancel>
          {/* <Link to={`/workspace/team/${}`}> */}
          <AlertDialogAction
            onClick={() => {
              console.log(emailList);
              const userEmails = emailList.value?.map((email1) => ({
                email: email1,
              }));
              createTeam({
                title: title,
                info: info,
                users: userEmails,
              });
            }}
          >
            팀 생성
          </AlertDialogAction>
          {/* </Link> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
