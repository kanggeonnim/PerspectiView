import ReactFlow, { Controls, Panel, ConnectionLineType, Background, MiniMap } from "reactflow";
import CustomEdge from "./CustomEdge";
import useNodeStore from "@/store/useNodeStore";

// We need to import the React Flow styles to make it work
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
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
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
const snapGrid = [20, 20];

export default function FlowCard() {
  // whenever you use multiple values, you should use shallow for making sure that the component only re-renders when one of the values change
  const { nodes, edges, onNodesChange, onEdgesChange, addStory } = useNodeStore(selector);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodeOrigin={nodeOrigin}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultViewport={defaultViewport}
      attributionPosition="top-right"
      connectionLineType={ConnectionLineType.Straight}
      fitView
    >
      <Background />
      <Controls showInteractive={false} />
      <Panel position="top-left" className="text-xl font-bold">
        작품 내 스토리의 흐름
      </Panel>
      <Panel position="top-right">
        <Button onClick={() => addStory(nodes.length)}>
          <Plus className="w-4 h-4 mr-2" /> 스토리 추가
        </Button>
      </Panel>
      <MiniMap />
    </ReactFlow>
  );
}
