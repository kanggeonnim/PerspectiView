import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useFshadow = create(
  devtools((set) => ({
    fshadows: {},
    setFshadows: (newFshadows) => set({ fshadows: newFshadows }),
  }))
);
