import { applyEdgeChanges } from "reactflow";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
const colors = [
  "#E2E2E2",
  "#ff75c3",
  "#ffa647",
  "#ffe83f",
  "#9fff5b",
  "#70e2ff",
  "#cd93ff",
  "#09203f",
  "#D1180B",
];
const useNodeStore = create(
  devtools((set, get) => ({
    nodes: [
      {
        id: "1",
        type: "story",
        data: { title: "story", color: "#ff75c3" },
        position: { x: 0, y: 0 },
      },
      // {
      //   id: "2",
      //   type: "story",
      //   data: { title: "story", color: "#ffa647" },
      //   position: { x: 200, y: 0 },
      // },
    ],
    edges: [
      // {
      //   id: "1",
      //   style: {
      // // stroke: "#334155",
      //  // strokeWidth: 3,
      //     sourceColor: "#ff75c3",
      //     targetColor: "#ffa647",
      //   },
      //   type: "story",
      //   source: "1",
      //   sourceHandle: null,
      //   target: "2",
      //   targetHandle: null,
      // },
    ],

    onNodesChange: (changes) => {
      if (changes[0].type === "position" && changes[0].dragging) {
        // y축만 이동하도록 설정
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
        console.log(get().edges);
      }
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },

    addStory(addIndex) {
      console.log(addIndex);
      const lastNode = get().nodes[addIndex - 1];
      const newNodeId = String(Number(lastNode.id) + 1);

      const type = "story";
      const data = {
        title: "storyyyy",
        color: colors[Math.floor(Math.random() * 9)], // 받아온 plotColor 넣어주기
      };

      const position = { x: Number(lastNode.id) * 200, y: 0 };

      set({
        nodes: [
          ...get().nodes,

          {
            id: newNodeId,
            type,
            data,
            position,
            positionAbsolute: position,
            width: 128,
            height: 160,
            selected: false,
            dragging: false,
          },
        ],
      });
      console.log("nodes", get().nodes);

      /*
       *
       *
       * 가장 마지막 node와 연결하는 edge 자동으로 생성
       */
      const lastEdge = get().edges.slice(-1)[0];
      const newEdgeId = lastEdge === undefined ? "1" : String(Number(lastEdge.id) + 1);

      const sourceColor = lastNode.data.color;
      const targetColor = data.color;
      const newEdge = {
        id: newEdgeId,
        style: {
          sourceColor: sourceColor,
          targetColor: targetColor,
        },
        type: "story",
        source: lastNode.id,
        sourceHandle: null,
        target: newNodeId,
        targetHandle: null,
        animated: true,
      };

      set({ edges: [...get().edges, newEdge] });
      console.log("edges", get().edges);
    },
  }))
);

export default useNodeStore;
