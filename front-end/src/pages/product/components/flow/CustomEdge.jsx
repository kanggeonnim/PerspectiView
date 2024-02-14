import { Button } from "@/components/ui/button";
import useStoryQueryModule from "@/hook/useStoryQueryModule";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useReactFlow } from "reactflow";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
}) {
  const { setEdges, setNodes, addNodes } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { teamId, productId } = useParams();
  const { createStory } = useStoryQueryModule(teamId, productId);
  const onEdgeClick = (event) => {
    event.stopPropagation();
    console.log(
      "edge click",
      event,
      id,

      sourcePosition,
      targetPosition
    );
    // createStory();
  };
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        {/* left button */}
        <Button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${sourceX + 5}px,${sourceY - 10}px)`,
            pointerEvents: "all",
            backgroundColor: `${style.sourceColor}`,
          }}
          className="nodrag nopan"
          size="xs"
          onClick={onEdgeClick}
        >
          <Plus size={10} />
        </Button>
        {/* right button */}
        <Button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${targetX - 5}px,${targetY - 10}px)`,
            pointerEvents: "all",
            backgroundColor: `${style.targetColor}`,
          }}
          className="nodrag nopan "
          size="xs"
          onClick={onEdgeClick}
        >
          <Plus size={10} />
        </Button>
      </EdgeLabelRenderer>
    </>
  );
}
