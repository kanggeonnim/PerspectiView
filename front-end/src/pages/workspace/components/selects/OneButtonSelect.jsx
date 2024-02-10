import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function OneButtonselect() {
    // 체크 버튼
    const arr = [
      { id: 1, name: "드라마" },
      { id: 2, name: "로맨스" },
      { id: 3, name: "느와르" },
      { id: 4, name: "스릴러" },
      { id: 5, name: "SF" },
    ];
    const [pick, setPick] = useState(arr);
    const [select, setSelect] = useState([]);
  
    return pick.map((item) => (
      <div key={item.id}>
        <Badge
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