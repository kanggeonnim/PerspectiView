import { Card } from "@/components/ui/card";
import { BookPlus } from "lucide-react";
import { Link } from "react-router-dom";

const works = [
  { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 3, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 4, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 5, url: "https://picsum.photos/200/300", title: "mywork" },
];

function CreateWork() {
  return (
    <Card className="flex items-center justify-center w-32 border-dashed h-36">
      <BookPlus color="#909090" />
    </Card>
  );
}

function EachWork({ url, title }) {
  return (
    <div className="flex flex-col items-center">
      <Card className="w-32 h-36 ">
        <img className="w-full h-full rounded-xl" src={url} alt="cover of work" />
      </Card>
      <div className="m-2">{title}</div>
    </div>
  );
}

function WorkList() {
  return (
    <div className="flex flex-wrap content-start justify-start w-full h-full gap-10 p-6">
      <CreateWork />
      {works.map((work, index) => (
        <Link to={`/product/${index}`} key={index}>
          <EachWork url={work.url} title={work.title} />
        </Link>
      ))}
    </div>
  );
}

export default WorkList;
