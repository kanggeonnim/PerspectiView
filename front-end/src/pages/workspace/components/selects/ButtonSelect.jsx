// import { useState } from "react";
// import { Badge } from "@/components/ui/badge";

// export default function Buttonselect() {
//   // 체크 버튼
//   // 장르
//   const arr = [
//     { id: 1, name: "SF" },
//     { id: 2, name: "액션" },
//     { id: 3, name: "로맨스" },
//     { id: 4, name: "드라마" },
//   ];
//   const [pick, setPick] = useState(arr);
//   const [select, setSelect] = useState([]);

//   return pick.map((item) => (
//     <div key={item.id}>
//       <Badge
//         className="cursor-pointer "
//         onClick={() => {
//           !select.includes(item)
//             ? setSelect((select) => [...select, item])
//             : setSelect(select.filter((button) => button !== item));
//         }}
//         variant={select.includes(item) ? "destructive" : "off"}
//       >
//         {item.name}
//       </Badge>
//     </div>
//   ));
// }
// 기존 코드

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function Buttonselect({ onSelect, selectedGenres }) {
  // const arr = [
  //   { id: 1, name: "SF" },
  //   { id: 2, name: "액션" },
  //   { id: 3, name: "로맨스" },
  //   { id: 4, name: "드라마" },
  // ];
  

  const handleSelect = (item) => {
    const isSelected = selectedGenres.some((genre) => genre.id === item.id);
    const updatedGenres = isSelected
      ? selectedGenres.filter((genre) => genre.id !== item.id)
      : [...selectedGenres, item];
    onSelect(updatedGenres);
  };

  return arr.map((item) => (
    <div key={item.id}>
      <Badge
        className="cursor-pointer"
        onClick={() => handleSelect(item)}
        variant={selectedGenres.some((genre) => genre.id === item.id) ? "destructive" : "off"}
      >
        {item.name}
      </Badge>
    </div>
  ));
}
