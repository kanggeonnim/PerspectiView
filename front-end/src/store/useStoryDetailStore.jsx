import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStoryDetailStore = create(
  devtools((set) => ({
    storyDetail: {},
    setStoryDetail: (newStoryDetail) => set({ storyDetail: newStoryDetail }),
    storyFshadowList: [],
    setStoryFshadowList: (newStoryFshadowList) =>
      set({ storyFshadowList: newStoryFshadowList }),
  }))
);
