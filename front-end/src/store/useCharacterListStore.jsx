import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useCharacterListStore = create(
  devtools((set) => ({
    characterList: null,
    setCharacterList: (characterList) => {
      set({ characterList: characterList });
    },
  }))
);
