import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Editable } from "@ark-ui/react";
import WorkListCard from "./WorkListCard";

const works = [
  { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 3, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
  // { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  // { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
  // { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
];

function TeamWorkspaceBody() {
  return (
    <div className="flex w-full gap-3 m-10 h-5/6">
      <div className="flex flex-col w-1/3 h-full gap-3">
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>팀 정보</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Editable.Root defaultValue="Team 1" activationMode="dblclick" placeholder="팀명을 입력하세요.">
              <Editable.Label>팀명</Editable.Label>
              <Editable.Area>
                <Editable.Input />
                <Editable.Preview />
              </Editable.Area>
            </Editable.Root>
            <Editable.Root defaultValue="우리 팀은 .." activationMode="dblclick" placeholder="팀설명을 입력하세요.">
              <Editable.Label>팀 소개</Editable.Label>
              <Editable.Area>
                <Editable.Input />
                <Editable.Preview />
              </Editable.Area>
            </Editable.Root>
          </CardContent>
        </Card>
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>팀원 정보</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input type="email" placeholder="팀원 이메일을 입력하세요" />
            <div>팀원</div>
            <div>ssafy@gmail.com</div>
          </CardContent>
        </Card>
      </div>
      <WorkListCard word="팀 워크스페이스" works={works} />
    </div>
  );
}

export default TeamWorkspaceBody;
