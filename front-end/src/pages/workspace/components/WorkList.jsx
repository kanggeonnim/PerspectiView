import { Card } from "@/components/ui/card";
import { BookPlus } from 'lucide-react';

function CreateWork() {
  return (
      <Card className="flex items-center justify-center w-32 border-dashed h-36">
        <BookPlus color="#909090" />
      </Card>
  );
}


function EachWork({url,title}) {
  return (
    <div className="flex flex-col items-center ">
      <Card className="w-32 h-36 ">
          <img
          className="w-full h-full rounded-xl"
          src={url}
          alt="cover of work"
          />
      </Card>
    <div className="m-2">{title}</div>
    </div>
  );
}


function WorkList({works}) {
  return (
    <div className="flex flex-wrap content-start justify-start p-6 gap-x-10 gap-y-20">
      <CreateWork />
      {works.map((work, index) => (
          <EachWork key={work.index} url={work.url} title={work.title}/>
      ))}
    </div>
  );
}

export default WorkList;
