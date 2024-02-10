import { applyEdgeChanges } from "reactflow";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useNodeStore = create(
  devtools((set, get) => ({
    nodes: [],
    edges: [],
    setNodes: (newNodes) => {
      set({ nodes: newNodes });
    },

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

    addStory(newStory, plotId, plotColor) {
      console.log(newStory);
      const lastNode = get().nodes.slice(-1)[0];
      const newNodeId = String(get().nodes.length + 1);
      const type = "story";
      const data = {
        title: newStory.storyTitle,
        color: plotColor,
        plotId: plotId,
        characters: newStory.characters,
      };

      const position = { x: newNodeId * 200, y: 0 };

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

      /*
       *
       *
       * 가장 마지막 node와 연결하는 edge 자동으로 생성
       */
      if (get().nodes.length > 1) {
        const lastEdge = get().edges.slice(-1)[0];
        const newEdgeId = lastEdge === undefined ? "1" : String(Number(lastEdge.id) + 1);

        const sourceColor = lastNode.data.color;
        const targetColor = plotColor;
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
      }
    },
  }))
);

export default useNodeStore;
