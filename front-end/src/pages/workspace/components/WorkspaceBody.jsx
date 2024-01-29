
import { Card } from "@/components/ui/card";
import CardHeader from "./CardHeader";
import WorkList from "./WorkList";


function WorkspaceBody({word,works}) {
  return (
    <Card className="flex-col p-20">
      <CardHeader word={word} />
      <WorkList works={works} />
    </Card>
  );
}

export default WorkspaceBody;