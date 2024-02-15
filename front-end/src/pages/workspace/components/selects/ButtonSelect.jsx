import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useGenreStore } from "@/store/product/useGenreStore";

export default function Buttonselect({ onSelect, isEditing }) {
  const arr = [
    { id: 1, name: "SF" },
    { id: 2, name: "액션" },
    { id: 3, name: "로맨스" },
    { id: 4, name: "드라마" },
  ];

  const [select, setSelect] = useState([]);
  const { genres, setGenres } = useGenreStore();
  
  useEffect(() => {
    onSelect(select); // 선택된 장르들을 상위 컴포넌트로 전달
    setGenres(select); // 선택된 장르들을 상태로 저장
  }, [select, onSelect, setGenres]);

  const handleBadgeClick = (item) => {
    if (select.some((selectedItem) => selectedItem.id === item.id)) {
      setSelect((prevSelect) =>
        prevSelect.filter((button) => button.id !== item.id)
      );
    } else {
      setSelect((prevSelect) => [...prevSelect, item]);
    }
  };
  console.log()
  return arr.map((item) => (
    <div key={item.id}>
      <Badge
        className="cursor-pointer"
        onClick={() => handleBadgeClick(item)}
        variant={select.some((selectedItem) => selectedItem.id === item.id) ? "destructive" : "off"}
      >
        {item.name}
      </Badge>
    </div>
  ));
}
