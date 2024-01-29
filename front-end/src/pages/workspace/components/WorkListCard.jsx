
import { Card } from "@/components/ui/card";
import CardHeader from "./CardHeader";
import WorkList from "./WorkList";


function WorkListCard({word,works}) {
  return (
    <Card className="flex flex-col w-full h-full p-20">
      <CardHeader word={word} />
      <WorkList works={works} />
    </Card>
  );
}

export default WorkListCard;