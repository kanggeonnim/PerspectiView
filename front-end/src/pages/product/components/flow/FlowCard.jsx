import ReactFlow, { Controls, Panel, ConnectionLineType, Background, MiniMap } from "reactflow";
import CustomEdge from "./CustomEdge";
import useNodeStore from "@/store/story/useNodeStore";

// We need to import the React Flow styles to make it work
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useStoryQueryModule from "@/hook/useStoryQueryModule";
import { useNavigate, useParams } from "react-router-dom";
import { usePlotListStore } from "@/store/plot/usePlotListStore";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  arrangeStory: store.arrangeStory,
});

const nodeTypes = {
  story: CustomNode,
  empty: CustomNode,
};

const edgeTypes = {
  story: CustomEdge,
};

// This makes the node origin to be in the center of a node
const nodeOrigin = [0.5, 0.5];
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
const snapGrid = [20, 20];

export default function FlowCard() {
  const navigate = useNavigate();
  const { teamId, productId } = useParams();
  const { moveStory } = useStoryQueryModule(teamId, productId);
  const { plotList } = usePlotListStore();
  const { addEmptyStory } = useNodeStore();

  const { nodes, edges, onNodesChange, onEdgesChange } = useNodeStore(selector);
  const [movedNode, setMovedNode] = useState(null);

  // console.log("nodes", nodes);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodeClick={() => {
        if (movedNode.type === "story")
          navigate(
            `/team/${teamId}/product/${productId}/plot/${movedNode.plotId}/story/${movedNode.storyId}`
          );
      }}
      onNodeDragStop={() => {
        if (movedNode && movedNode.dragging && !movedNode.selected && movedNode.type === "story") {
          moveStory(
            {
              storyId: movedNode.storyId,
              positionY: movedNode.position.y,
            },
            movedNode.plotId
          );
        }
      }}
      onNodesChange={(changes) => {
        const findNode = nodes.find((node) => node.id === changes[0].id);
        setMovedNode({
          ...changes[0],
          plotId: findNode.data.plotId,
          storyId: findNode.data.storyId,
          type: findNode.type,
        });
        if (findNode.type === "story") {
          onNodesChange(changes);
        }
      }}
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
        {plotList && plotList.length > 0 && (
          <Button
            onClick={
              () => {
                console.log(nodes, nodes.length);
                console.log(nodes.slice(-1), plotList, plotList.length);
                const lastNode = nodes.slice(-1);
                // console.log(nodes.length, lastNode[0].data.plotId, lastNode[0].data.borderColor);
                addEmptyStory(nodes.length, lastNode[0].data.plotId, lastNode[0].data.borderColor);
              }

              // addStory({
              //   // id: data.storyId,
              //   type: "story",
              //   data: {
              //     title: data.storyTitle,
              //     borderColor: borderColor,
              //     plotId: plotId,
              //     storyId: data.storyId,
              //     characters: data.characters,
              //   },
              //   position: { x: data.positionX, y: data.positionY },
              //   positionAbsolute: { x: data.positionX, y: data.positionY },
              //   width: 128,
              //   height: 160,
              //   selected: false,
              //   dragging: false,
              // }
              // )
            }
          >
            <Plus className="w-4 h-4 mr-2" /> 스토리 추가
          </Button>
        )}
      </Panel>
      <MiniMap className="bg-primary-accent-light " nodeColor="#402785" nodeStrokeColor="#000000" />
    </ReactFlow>
  );
}
