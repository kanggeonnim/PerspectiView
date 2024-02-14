import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useImageStore = create(
  devtools((set) => ({
    images: null,
    setImages: (images) => {
      set({ images: images });
    },
  }))
);