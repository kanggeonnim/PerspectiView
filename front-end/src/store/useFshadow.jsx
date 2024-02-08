import { create } from "zustand";
const dummyForeshadowing = {
  code: "200",
  message: "ok",
  data: {
    fshadowList: {
      1: {
        fshadowId: "1",
        columnId: "column-1",
        productId: "1",
        fshadowName: "보물상자11",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [],
        fshadowClose: null,
      },
      2: {
        fshadowId: "2",
        columnId: "column-1",
        productId: "1",
        fshadowName: "보물상자2",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [],
        fshadowClose: null,
      },
      3: {
        fshadowId: "3",
        columnId: "column-1",
        productId: "1",
        fshadowName: "보물상자3",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [],
        fshadowClose: null,
      },
    },
  },
};

export const useFshadow = create((set) => ({
  fshadows: dummyForeshadowing.data.fshadowList,
  //FIXME 이게 맞나?
  setFshadows: (newAllData) => set({ fshadows: newAllData }),

  //복선 생성시 복선리스트 업데이트하기 위함
  // triggerUpdate: false,
  // setTriggerUpdate: () =>
  //   set((state) => ({ triggerUpdate: !state.triggerUpdate })),
}));
