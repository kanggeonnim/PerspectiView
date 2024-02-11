import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const usePlotListStore = create(
  devtools((set) => ({
    plotList: null,
    setPlotList: (plotList) => {
      set({ plotList: plotList });
    },
  }))
);
