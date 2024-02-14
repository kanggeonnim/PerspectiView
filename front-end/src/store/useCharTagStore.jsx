import { create } from "zustand";
import { devtools } from "zustand/middleware";

const wordArr = ["락커", "힙합", "ENTJ", "골초", "락밴드","골무" , "골계", "골격"];

const useCharTagStore = create(devtools((set) => ({
  inputValue: "",
  setInputValue: (value) => set({ inputValue: value }),
  isHaveInputValue: false,
  setIsHaveInputValue: (value) => set({ isHaveInputValue: value }),
  dropDownList: wordArr,
  setDropDownList: (list) => set({ dropDownList: list }),
  dropDownItemIndex: -1,
  setDropDownItemIndex: (index) => set({ dropDownItemIndex: index }),
})));

export default useCharTagStore;