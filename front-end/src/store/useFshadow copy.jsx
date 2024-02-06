import { create } from "zustand";
const dummyForeshadowing = {
  code: "200",
  message: "ok",
  data: {
    fshadowList: {
      1: {
        fshadowId: "1",
        productId: "1",
        fshadowName: "보물상자12",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "123",
          },
          {
            storyId: "124",
          },
        ],
        fshadowClose: false,
      },
      2: {
        fshadowId: "2",
        productId: "1",
        fshadowName: "보물상자13",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [],
        fshadowClose: false,
      },
      3: {
        fshadowId: "3",
        columnId: "column-1",
        productId: "1",
        fshadowName: "보물상자14",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "1",
          },
          {
            storyId: "2",
          },
        ],
        fshadowClose: false,
      },
    },
  },
};

export const useFshadow = create((set) => ({
  allData: {
    tasks: dummyForeshadowing.data.fshadowList,
    columns: {
      "column-1": {
        id: "column-1",
        title: "미사용 복선",
        taskIds: [1, 2, 3],
      },
      "column-2": {
        id: "column-2",
        title: "사용 중인 복선",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "회수 완료 복선",
        taskIds: [],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ["column-1", "column-2", "column-3"],
  },
  setAllData: (newAllData) => set({ allData: newAllData }),

  //복선 생성시 복선리스트 업데이트하기 위함
  // triggerUpdate: false,
  // setTriggerUpdate: () =>
  //   set((state) => ({ triggerUpdate: !state.triggerUpdate })),
}));
