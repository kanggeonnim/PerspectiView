import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function RadioSelect() {
    // 라디오 버튼 
    const arrs = [
      { id: 1, name: "웹소설" },
      { id: 2, name: "시나리오" },
      { id: 3, name: "웹툰 스토리" },
      { id: 4, name: "게임 스토리" },
      { id: 5, name: "에세이" },
    ];
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };
    return (
      <div className="box-border flex flex-wrap w-5/6 gap-2">
        {arrs.map((arr) => (
          <label key={arr.id}>
            <Badge variant={selectedOption === `option${arr.id}` ? "destructive" : "off"}>
              <input
                type="radio"
                value={`option${arr.id}`}
                checked={selectedOption === `option${arr.id}`}
                onChange={handleOptionChange}
                className="hidden"
              />
              {arr.name}
            </Badge>
          </label>
        ))}
      </div>
    );
  }