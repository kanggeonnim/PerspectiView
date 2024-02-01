const dummyForeshadowing = {
  code: "200",
  message: "ok",
  data: {
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
    },
  },
};

const initialData = {
  tasks: dummyForeshadowing.data.fshadowList,
  // tasks: {
  //   "1":{ fshadowId: "1", productId: "1", fshadowContent:
  //         "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.", }
  // }
  // tasks: {
  //   "task-10": { id: "task-11", content: "Take out the garbage" },
  //   "task-20": { id: "task-22", content: "Watch my favorite show" },
  //   "task-30": { id: "task-33", content: "Charge my phone" },
  //   "task-40": { id: "task-44", content: "Cook dinner" },
  // },
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
};

export default initialData;
