import { create } from "zustand";
const dummyForeshadowing = {
  code: "200",
  message: "ok",
  data: {
    //TODO fshadowList->Object로 이름 변경
    fshadowList: {
      //key값이 "string"으로 작성했는데 integer로 바뀜.but, 작동함.
      1: {
        fshadowId: "1",
        productId: "1",
        fshadowName: "보물상자",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        fromStoryId: "121",
        toStoryId: "133",
        fshadowClose: true,
      },
      2: {
        fshadowId: "2",
        productId: "1",
        fshadowName: "보물상자2",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        fromStoryId: "122",
        toStoryId: null,
        fshadowClose: false,
      },
      3: {
        fshadowId: "3",
        productId: "1",
        fshadowName: "보물상자3",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "123",
          },
        ],
        fshadowClose: false,
      },
      4: {
        fshadowId: "4",
        productId: "1",
        fshadowName: "보물상자4",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "123",
          },
        ],
        fshadowClose: false,
      },
      5: {
        fshadowId: "5",
        productId: "1",
        fshadowName: "보물상자5",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "123",
          },
        ],
        fshadowClose: false,
      },
      6: {
        fshadowId: "6",
        productId: "1",
        fshadowName: "보물상자6",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "123",
          },
        ],
        fshadowClose: false,
      },
      7: {
        fshadowId: "7",
        productId: "1",
        fshadowName: "보물상자7",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "123",
          },
        ],
        fshadowClose: false,
      },
      8: {
        fshadowId: "8",
        productId: "1",
        fshadowName: "보물상자8",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "123",
          },
        ],
        fshadowClose: false,
      },
      9: {
        fshadowId: "9",
        productId: "1",
        fshadowName: "보물상자9",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "123",
          },
        ],
        fshadowClose: false,
      },
      10: {
        fshadowId: "10",
        productId: "1",
        fshadowName: "보물상자10",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "123",
          },
        ],
        fshadowClose: false,
      },
      11: {
        fshadowId: "11",
        productId: "1",
        fshadowName: "보물상자11",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "123",
          },
        ],
        fshadowClose: false,
      },
      12: {
        fshadowId: "12",
        productId: "1",
        fshadowName: "보물상자12",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "123",
          },
        ],
        fshadowClose: false,
      },
      13: {
        fshadowId: "13",
        productId: "1",
        fshadowName: "보물상자13",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "123",
          },
        ],
        fshadowClose: false,
      },
      14: {
        fshadowId: "14",
        productId: "1",
        fshadowName: "보물상자14",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          {
            storyId: "123",
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
        taskIds: [1, 2, 3, 4, 5, 6, 7],
      },
      "column-2": {
        id: "column-2",
        title: "사용 중인 복선",
        taskIds: [8, 9, 10, 11, 12, 13, 14],
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
}));
