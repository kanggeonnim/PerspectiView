import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useReactFlow } from "reactflow";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  sourceColor,
  targetColor,
  style,
}) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (event) => {
    event.stopPropagation();
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };
  console.log(sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, style);
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
