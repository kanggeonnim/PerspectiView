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
  console.log(id, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition);
  const onEdgeClick = (event) => {
    event.stopPropagation();
    console.log(event);
    // setNodes((nodes) => nodes.filter((node) => node.id !== id));
    // setEdges((edges) => edges.filter((edge) => edge.id !== id));
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
