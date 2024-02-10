import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const usePlotStore = create(
  devtools((set) => ({
    plot: {
      plotName: "",
      plotColor: "",
    },
    setUser: (plot) => {
      set({ plot: plot });
    },
  }))
);
