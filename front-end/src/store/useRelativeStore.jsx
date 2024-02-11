import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useRelativeStore = create(
    devtools((set) => ({
      nodes: null,
      setNodes: (nodes) => {
        set({ nodes: nodes });
      },
      edges: null,
      setNodes: (edges) => {
        set({ edges: edges });
      },
      viewport: null,
      setViewport: (viewport) => {
        set({viewport: viewport})
      }
    }))
  );


//   const initialNodes = [
//     { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
//     { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
//   ];
  
//   const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];