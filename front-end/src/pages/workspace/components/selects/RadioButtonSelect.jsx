import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function RadioButtonSelect({ isEditing }) {
  // 라디오 버튼
  // 카테고리
  const arrs = [
    { id: 1, name: "웹소설" },
    { id: 2, name: "시나리오" },
    { id: 3, name: "웹툰 스토리" },
    { id: 4, name: "게임 스토리" },
    { id: 5, name: "희곡" },
  ];
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="box-border flex flex-wrap w-5/6 gap-2">
      {arrs.map((arr) => (
        <label key={arr.id}>
          <Badge
            variant={selectedOption === `${arr.id}` ? "destructive" : "off"}
            className="cursor-pointer"
          >
            <input
              type="radio"
              value={`${arr.id}`}
              checked={selectedOption === `${arr.id}`}
              onChange={handleOptionChange}
              disabled={!isEditing}
              className="hidden"
            />
            {arr.name}
          </Badge>
        </label>
      ))}
    </div>
  );
}
