import { Card } from "@/components/ui/card";
import CardHeader from "./CardHeader";
import WorkList from "./WorkList";
import { Link, useParams } from "react-router-dom";


function WorkListCard({word,works}) {
  
  const {id} = useParams()

  

  return (
    <Link to={`/product/${works[0].id}`}>
      {/* FIXME 파라미터(임시) map를 통한 변경 필요 */}
      <Card className="flex flex-col w-full h-full p-20">
        <CardHeader word={word} />
        <WorkList works={works} />
      </Card>
    </Link>
  );
}

export default WorkListCard;