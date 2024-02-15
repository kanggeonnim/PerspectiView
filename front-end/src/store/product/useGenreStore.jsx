import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useGenreStore = create(
  devtools((set) => ({
    genres: null,
    setGenres: (genres) => {
      set({ genres: genres });
    },
  }))
);