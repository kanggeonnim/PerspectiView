import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useRelativeStore = create(
  devtools((set) => ({
    nodedatas: {
      id: "",
      width: 112, // 너비 픽스
      height: 132, // 높이 픽스
      type: "custom", // 커스텀 픽스
      data: { name: "", image: "" },
      position: { x: 0, y: 0 },
    },
    setNodedatas: (nodedatas) => {
      set({ nodedatas: nodedatas });
    },
    edgedatas: {
      id: "",
      source: "",
      sourceHandle: "",
      target: "",
      targetHandle: "",
      markerEnd: { type: "arrowclosed", color: "black" }, //픽스
      style: { strokeWidth: 2, stroke: "black" }, //픽스
      type: "custom", //픽스
    },
    setEdgedatas: (edgedatas) => {
      set({ edgedatas: edgedatas });
    },
    relations: {
      fromCharacter: {
        id: 0,
        name: "string",
        detail: "string",
        positionX: 0,
        positionY: 0,
      },
      toCharacter: {
        id: 0,
        name: "string",
        detail: "string",
        positionX: 0,
        positionY: 0,
      },
      productRelationInfo: "string",
      sourceId: 0,
      targetId: 0,
      sourceHandle: "string",
      targetHandle: "string",
    },
    setRelations: (relations) => {
      set({ relations: relations });
    },
  }))
);

export default useRelativeStore;
