import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function Buttonselect() {
  // 체크 버튼
  // 장르
  const arr = [
    { id: 1, name: "SF" },
    { id: 2, name: "액션" },
    { id: 3, name: "로맨스" },
    { id: 4, name: "드라마" },
  ];
  const [pick, setPick] = useState(arr);
  const [select, setSelect] = useState([]);

  return pick.map((item) => (
    <div key={item.id}>
      <Badge
        className="cursor-pointer "
        onClick={() => {
          !select.includes(item)
            ? setSelect((select) => [...select, item])
            : setSelect(select.filter((button) => button !== item));
        }}
        variant={select.includes(item) ? "destructive" : "off"}
      >
        {item.name}
      </Badge>
    </div>
  ));
}
