import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import WorkListCard from "./WorkListCard";

const worksData = [
  { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 3, url: "https://picsum.photos/200/300", title: "mywork" },
];

function TeamWorkspaceBody() {
  return (
    <div className="flex w-full gap-10 m-10 h-5/6">
      <div className="flex flex-col w-full h-full">
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>팀 정보</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {/* TODO : 팀 이름 */}
            <div>팀명: 팀{}</div>
            <div>팀 소개: 우리팀은 ... </div>
          </CardContent>
        </Card>
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>팀원 정보</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input type="email" placeholder="팀원 이메일을 입력하세요" />
            <div>팀원</div>
          </CardContent>
        </Card>
      </div>
      <WorkListCard className="w-full h-full" word="팀 워크스페이스" works={worksData} />
    </div>
  );
}

export default TeamWorkspaceBody;
