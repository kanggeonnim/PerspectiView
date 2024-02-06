import ReactFlow, { Controls, Panel, ConnectionLineType, Background, MiniMap } from "reactflow";
import { shallow } from "zustand/shallow";
import CustomEdge from "./CustomEdge";
import useNodeStore from "@/store/useNodeStore";

// We need to import the React Flow styles to make it work
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  addStory: store.addStory,
});

const nodeTypes = {
  story: CustomNode,
};

const edgeTypes = {
  story: CustomEdge,
};

// This makes the node origin to be in the center of a node
const nodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: "#334155", strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: "story" };

export default function FlowCard() {
  // whenever you use multiple values, you should use shallow for making sure that the component only re-renders when one of the values change
  const { nodes, edges, onNodesChange, onEdgesChange, addEdge, addStory } = useNodeStore(selector);

  console.log(edges);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={addEdge}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodeOrigin={nodeOrigin}
      connectionLineStyle={connectionLineStyle}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={ConnectionLineType.Straight}
      fitView
    >
      <Background />
      <Controls showInteractive={false} />
      <Panel position="top-left">React Flow Mind Map</Panel>
      <Panel position="top-right">
        <button onClick={addStory}>add</button>
      </Panel>
      <MiniMap />
    </ReactFlow>
  );
}
