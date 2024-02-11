// import { applyEdgeChanges } from "reactflow";
// import { create } from "zustand";
// import { devtools } from "zustand/middleware";

// const useRelativeStore = create(
//   devtools((set, get) => ({
//     // nodes: [],
//     relatives: [],
//     // setNodes: (newNodes) => set((state) => ({ nodes: newNodes }))
//     // ,
//     setRelatives: (newEdges) => set((state) => ({ relatives: newRelatives }))
//     ,
//   }))
// );

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useRelativeStore = create(
  devtools((set) => ({
    nodedata: null,
    setNodedata: (nodedata) => {
      set({ nodedata: nodedata });
    },
    edgedata: null,
    setEdgedata: (edgedata) => {
      set({ edgedata: edgedata });
    },
    viewport: null,
    setViewport: (viewport) => {
      set({ viewport: v });
    },
  }))
);

export default useRelativeStore;

// const initialNodes = [
//   { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
//   { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
// ];

// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
