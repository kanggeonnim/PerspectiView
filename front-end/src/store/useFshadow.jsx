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
        fshadowName: "보물상자1",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [],
        fshadowClose: false,
      },
      2: {
        fshadowId: "2",
        columnId: "column-1",
        productId: "1",
        fshadowName: "보물상자2",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [],
        fshadowClose: false,
      },
      3: {
        fshadowId: "3",
        columnId: "column-1",
        productId: "1",
        fshadowName: "보물상자3",
        fshadowContent:
          "화이트 드래곤이 놓고 간 보물상자 그 안에는 화이트 드래곤이 들어있고 블루 드래곤이 주워갔다.",
        storyIdList: [
          // 사용 체크 표시/해제하면 storyId에 추가/삭제, (storyIdList.length가 0이 아니고 fshadowClose가 false) => column-2 // (0이면 column-1)
        ],
        // 회수 체크 표시하면 storyIdList에 추가하고 true=> column-3
        fshadowClose: false,
      },
    },
  },
};

export const useFshadow = create((set) => ({
  fshadows: dummyForeshadowing.data.fshadowList,
  //FIXME 이게 맞나?
  setFshadows: (newAllData) => set({ fshadows: newAllData }),
  addStoryIdToFshadow: (fshadowId, newStoryId) =>
    set((state) => {
      const fshadowToUpdate = state.fshadows[fshadowId];
      if (!fshadowToUpdate) {
        console.error("Fshadow not found");
        return {};
      }

      // 기존 storyIdList 복사 후 새 storyId 추가
      const updatedStoryIdList = [
        ...fshadowToUpdate.storyIdList,
        { storyId: newStoryId },
      ];

      // 업데이트된 fshadow 객체 생성
      const updatedFshadow = {
        ...fshadowToUpdate,
        storyIdList: updatedStoryIdList,
      };

      // 전체 fshadows 상태 업데이트
      return {
        fshadows: {
          ...state.fshadows,
          [fshadowId]: updatedFshadow,
        },
      };
    }),

  //복선 생성시 복선리스트 업데이트하기 위함
  // triggerUpdate: false,
  // setTriggerUpdate: () =>
  //   set((state) => ({ triggerUpdate: !state.triggerUpdate })),
}));
