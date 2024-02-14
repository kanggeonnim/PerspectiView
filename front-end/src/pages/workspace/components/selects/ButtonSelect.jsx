import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useGenreStore } from "@/store/useGenreStore";

export default function Buttonselect({ onSelect }) {
  const arr = [
    { id: 1, name: "SF" },
    { id: 2, name: "액션" },
    { id: 3, name: "로맨스" },
    { id: 4, name: "드라마" },
  ];

  const [pick, setPick] = useState(arr);
  const [select, setSelect] = useState([]);
  const { genres, setGenres } = useGenreStore();
  
  useEffect(() => {
    onSelect(select); // 선택된 장르들을 상위 컴포넌트로 전달
    setGenres(select); // 선택된 장르들을 상태로 저장
  }, [select, onSelect, setGenres]);
  // console.log(select)
  return pick.map((item) => (
    <div key={item.id}>
      <Badge
        className="cursor-pointer"
        onClick={() => {
          !select.includes(item)
            ? setSelect((prevSelect) => [...prevSelect, item])
            : setSelect((prevSelect) =>
                prevSelect.filter((button) => button !== item)
              );
        }}
        variant={select.includes(item) ? "destructive" : "off"}
      >
        {item.name}
      </Badge>
    </div>
  ));
}
