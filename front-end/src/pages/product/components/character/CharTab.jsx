import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState, useRef } from "react";
import { PlusCircle } from "lucide-react";
import DnDFlow from "./reactflow/DragAndDrop";
import CharList from "./CharList";
import CharAdd from "./CharAdd";


export default function CharTab() {

  // const [capId, setCapId] = useState("")
  // const 
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    // url: ""
   
  });
  const { name, description } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [users, setUsers] = useState( [
    {
      id: 1,
      name: "도지",
      tag: ["doge", "currency", "meme"],
      url: "data:image/jpeg;base64,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",
      description: "왈왈"
    },
    {
      id: 2,
      name: "페페",
      tag: ["pepe", "sad", "meme"],
      url: "https://images.chosun.com/resizer/OXrnN3OlFesXmgmLyS3_FulhAts=/600x600/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/UVBJZL3RXAB36BDSHVM3MW2WNY.jpg",
      description: "SAD",
    },
    {
      id: 3,
      name: "페페2",
      tag: ["pepe", "happy", "meme"],
      url: "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/876/d7fd78748ae385999dfe54560819c3d7_res.jpeg",
      description: "SAD",
    },
  ] || []);

  const nextId = useRef(3);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      tag: [],
      name,
      description,
      url : ""
    };
    setUsers([...users, user]);

    setInputs({
      name: "",
      description: "",
      url: "",
    });
    nextId.current += 1;
  };

  const [selectedIdx, setSelectedIdx] = useState('');

  const onIdxChange = (idx) => {
    setSelectedIdx(idx)
  };
  return (
    <div className="flex items-center justify-center w-full h-full p-2 mt-2 border rounded shadow-md">
      <Card className="box-border w-full h-full">
        <div className="box-border flex flex-row h-full p-3">
          <div className="box-border w-2/3 m-2 text-2xl font-semibold border-r h-11/12">
            인물 관계도
            <DnDFlow users={users} idx={selectedIdx} />
          </div>
          <div className="flex flex-col w-1/3">
            <div className="flex justify-between">
              <div className="box-border w-1/2 m-2 text-2xl font-semibold h-11/12">
                인물 목록
              </div>
              <CharAdd name={name} description={description} onChange={onChange} onCreate={onCreate} key={name}  />
            </div>
            <div className="box-border w-full h-full m-2">
              <CharList users={users} key={name}  onIdxChange={(idx) => onIdxChange(idx)} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
