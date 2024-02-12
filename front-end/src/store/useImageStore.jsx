import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useImageStore = create(
  devtools((set) => ({
    image: null,
    setProduct: (image) => {
      set({ image: image });
    },
  }))
);