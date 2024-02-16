import useCharTagStore from "@/store/character/useCharTagStore";
import { useEffect } from "react";

const wordArr = ["락커", "힙합", "ENTJ", "골초", "락밴드", "골무", "골계", "골격", "골골골골"];
// FIXME 특징 받아올 DB로 대체

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
      const choosenTextList = wordArr.filter((textItem) => textItem.includes(inputValue));
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
      if (event.key === "ArrowDown" && dropDownList.length - 1 > dropDownItemIndex) {
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
    <div className="w-max h-max">
      <div
        className={`flex-row flex border w-max ${
          isHaveInputValue ? "rounded-t-lg" : "rounded-lg"
        } focus-within:shadow-lg z-30`}
      >
        <input
          type="text"
          value={inputValue}
          onChange={changeInputValue}
          onKeyUp={handleDropDownKey}
          className="flex flex-1 p-0 m-0 text-lg bg-transparent border-none outline-none"
        />
        <div className="mr-2 cursor-pointer" onClick={() => setInputValue("")}>
          &times;
        </div>
      </div>
      {isHaveInputValue && (
        <ul className="absolute z-10 block mx-auto bg-white border border-t-0 rounded-b-lg shadow-lg w-max">
          {dropDownList.length === 0 && <li className="w-m">해당하는 단어가 없습니다</li>}
          {dropDownList.map((dropDownItem, dropDownIndex) => {
            return (
              <li
                key={dropDownIndex}
                onClick={() => clickDropDownItem(dropDownItem)}
                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                className={`p-2 w-max ${dropDownItemIndex === dropDownIndex ? "bg-gray-200" : ""}`}
              >
                {dropDownItem}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
