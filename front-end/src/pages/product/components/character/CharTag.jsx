import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { create } from "zustand";
import useCharTagStore from "@/store/useCharTagStore";

const wordArr = ["락커", "힙합", "ENTJ", "골초", "락밴드","골무" , "골계", "골격"];

export default function CharTag() {
  const {
    inputValue,
    setInputValue,
    isHaveInputValue,
    setIsHaveInputValue,
    dropDownList,
    setDropDownList,
    dropDownItemIndex,
    setDropDownItemIndex,
  } = useCharTagStore();

  const showDropDownList = () => {
    if (inputValue === "") {
      setIsHaveInputValue(false);
      setDropDownList([]);
    } else {
      const choosenTextList = wordArr.filter((textItem) =>
        textItem.includes(inputValue)
      );
      setDropDownList(choosenTextList);
    }
  };

  const changeInputValue = (event) => {
    setInputValue(event.target.value);
    setIsHaveInputValue(true);
  };

  const clickDropDownItem = (clickedItem) => {
    setInputValue(clickedItem);
    setIsHaveInputValue(false);
  };

  const handleDropDownKey = (event) => {
    if (isHaveInputValue) {
      if (
        event.key === "ArrowDown" &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === "ArrowUp" && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1);
      if (event.key === "Enter" && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  };

  useEffect(showDropDownList, [inputValue]);

  return (
    <div className="h-max">
      <div className={`flex-row flex border ${isHaveInputValue ? 'rounded-t-lg' : 'rounded-lg'} focus-within:shadow-lg z-30`}>
        <input
          type='text'
          value={inputValue}
          onChange={changeInputValue}
          onKeyUp={handleDropDownKey}
          className="flex flex-1 m-0 p-0 bg-transparent border-none outline-none text-lg"
        />
        <div className="cursor-pointer mr-2" onClick={() => setInputValue('')}>&times;</div>
      </div>
      {isHaveInputValue && (
        <ul className="block mx-auto bg-white border border-t-0 rounded-b-lg shadow-lg z-10">
          {dropDownList.length === 0 && (
            <li className="">해당하는 단어가 없습니다</li>
          )}
          {dropDownList.map((dropDownItem, dropDownIndex) => {
            return (
              <li
                key={dropDownIndex}
                onClick={() => clickDropDownItem(dropDownItem)}
                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                className={`p-2 ${dropDownItemIndex === dropDownIndex ? 'bg-gray-200 z-auto' : ''}`}
              >
                {dropDownItem}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
};
