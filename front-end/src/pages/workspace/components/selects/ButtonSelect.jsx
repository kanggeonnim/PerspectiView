import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useGenreStore } from "@/store/useGenreStore";

export default function Buttonselect({ isEditing, onSelect, selectedGenres }) {
  // 체크 버튼
  // 장르
  const arr = [
    { id: 1, name: "SF" },
    { id: 2, name: "액션" },
    { id: 3, name: "로맨스" },
    { id: 4, name: "드라마" },
  ];

  const handleSelect = (item) => {
    const isSelected = selectedGenres?.some((genre) => genre.id === item.id);
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
        variant={selectedGenres?.some((genre) => genre.id === item.id) ? "destructive" : "off"}
        // onClick={() => {
        //   if (isEditing) {
        //     !select.includes(item)
        //       ? setSelect((select) => [...select, item])
        //       : setSelect(select.filter((button) => button !== item));
        //   }
        // }}
        // variant={select.includes(item) ? "destructive" : "off"}
      >
        {item.name}
      </Badge>
    </div>
  ));
}
