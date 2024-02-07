import { applyNodeChanges, applyEdgeChanges } from "reactflow";
import { create } from "zustand";

const useNodeStore = create((set, get) => ({
  nodes: [
    {
      id: "0",
      type: "story",
      data: { title: "story", color: "#ff75c3" },
      position: { x: 0, y: 0 },
    },
    {
      id: "1",
      type: "story",
      data: { title: "story", color: "#ffa647" },
      position: { x: 200, y: 0 },
    },
  ],
  edges: [],

  onNodesChange: (changes) => {
    if (changes[0].type === "position" && changes[0].dragging) {
      set({
        nodes: applyNodeChanges(
          [
            {
              ...changes[0],
              position: {
                x: get().nodes.find((node) => node.id === changes[0].id).position.x,
                y: changes[0].position.y,
              },
              positionAbsolute: {
                x: get().nodes.find((node) => node.id === changes[0].id).position.x,
                y: changes[0].positionAbsolute.y,
              },
            },
          ],
          get().nodes
        ),
      });
    } else set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
    console.log(get().edges);
  },

  addEdge(data) {
    console.log(data);
    const id = get().edges.length + "";
    const sourceColor = get().nodes[data.source].data.color;
    const targetColor = get().nodes[data.target].data.color;

    const edge = { id, ...data, style: { ...data.style, sourceColor, targetColor } };
    set({ edges: [edge, ...get().edges] });
    console.log("edges", get().edges);
  },

  addStory() {
    const id = get().nodes.length + "";
    const type = "story";
    const data = {
      title: "storyyyy",
      color: "#9fff5b", // plotColor
    };
    const position = { x: Number(id) * 200, y: 0 };

    console.log({ id, type, data, position });
    set({ nodes: [...get().nodes, { id, type, data, position, width: 128, height: 160 }] });
    console.log(get().nodes);

    // addSTory()
    // const id = nanoid(6);
    // const sourceColor = get().nodes[data.source].data.color;
    // const targetColor = get().nodes[data.target].data.color;

    // const edge = { id, ...data, style: { ...data.style, sourceColor, targetColor } };
    // set({ edges: [edge, ...get().edges] });
    // console.log("edges", get().edges);
  },
}));

export default useNodeStore;
