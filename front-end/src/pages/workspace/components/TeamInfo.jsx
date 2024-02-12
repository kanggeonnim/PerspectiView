import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Editable } from "@ark-ui/react";
import ProductListCard from "./ProductListCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const teamInfoData = {
  teamTitle: "B310",
  teamInfo: "행복이 넘치는 팀",
  personal: false,
  members: Array.from({ length: 30 }, (_, index) => ({
    userId: index,
    usernickName: `yasuo ${index + 1}`,
    userImage:
      index % 2 == 0 ? "https://github.com/shadcn.png" : "https://ui.shadcn.com/avatars/01.png",
    userEmail: "leageOfLegends@gmail.com",
  })),
};

// TODO: 팀 이름 받아오기
function TeamInfo() {
  // const { workspaceName, setWorkspaceName } = useOutletContext();

  // console.log(workspaceName);

  return (
    <div className="flex w-full max-h-full min-h-full gap-3 m-2 ">
      <div className="flex flex-col w-1/3 h-full gap-3">
        <Card className="w-full border rounded shadow-md h-2/5">
          <CardHeader className="p-4">
            <CardTitle className="text-xl font-bold">팀 정보</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Editable.Root
              // value={workspaceName}
              activationMode="dblclick"
              // onValueChange={(value) => setWorkspaceName(value)}
              // placeholder="팀명을 입력하세요."
            >
              <Editable.Label>팀명</Editable.Label>
              <Editable.Area>
                <Editable.Input />
                <Editable.Preview />
              </Editable.Area>
            </Editable.Root>
            <Editable.Root
              defaultValue="우리 팀은 .."
              activationMode="dblclick"
              placeholder="팀설명을 입력하세요."
            >
              <Editable.Label>팀 소개</Editable.Label>
              <Editable.Area>
                <Editable.Input />
                <Editable.Preview />
              </Editable.Area>
            </Editable.Root>
          </CardContent>
        </Card>
        <Card className="flex flex-col w-full h-full border rounded shadow-md">
          <CardHeader className="p-4">
            <CardTitle className="text-xl font-bold ">팀원 정보</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full ">
            <Input type="email" placeholder="팀원 이메일을 입력하세요" className="my-4" />
            <div className="w-full sm:h-24 md:h-64 lg:h-64 ">
              <ScrollArea className="w-full h-full border rounded-md">
                <div className="p-4">
                  {/* <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4> */}
                  {teamInfoData.members.map((member) => (
                    <div key={member.userId}>
                      <div className="text-sm">
                        <div className="flex items-center justify-between" key={member.userId}>
                          <div className="px-1 mx-1">
                            <Avatar>
                              <AvatarImage src={member.userImage} alt="@shadcn" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>

                          <div className="flex flex-col items-start w-full text-sm font-bold">
                            <div className="mx-1 text-xs ">작가명</div>
                            <div className="mx-1 text-xs break-all text-zinc-600">
                              user@gmail.com
                            </div>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
      <ProductListCard products={teamInfoData} />
    </div>
  );
}

export default TeamInfo;
