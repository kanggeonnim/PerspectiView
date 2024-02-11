import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useRelativeListStore = create(
  devtools((set) => ({
    relativeList: null,
    setPlotList: (relativeList) => {
      set({ relativeList: relativeList });
    },
  }))
);
