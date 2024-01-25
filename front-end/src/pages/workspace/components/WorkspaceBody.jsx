
import { Card } from "@/components/ui/card";
import BodyHeader from "./BodyHeader";
import WorkList from "./WorkList";


function WorkspaceBody({word,works}) {
  return (
    <Card className="flex-col p-10 m-10 border w-flex">
      <BodyHeader word={word} />
      <WorkList works={works} />
    </Card>
  );
}

export default WorkspaceBody;