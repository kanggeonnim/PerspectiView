import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useFshadow = create(
  devtools((set) => ({
    fshadows: {},
    // fshadows: dummyForeshadowing.data.fshadowList,
    //FIXME 이게 맞나?
    setFshadows: (newFshadows) => set({ fshadows: newFshadows }),
  }))
);
