import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useCategoryStore = create(
  devtools((set) => ({
    categories: null,
    setcategorys: (categories) => {
      set({ categories: categories });
    },
  }))
);