import { BaseEdge, EdgeLabelRenderer, getStraightPath, MarkerType } from "reactflow";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}) {
  // function CustomEdge({ id, fromX, fromY, toX, toY, connectionLineStyle }) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    
  });

  return (
    <>
      {/* <g>
      <path style={connectionLineStyle} fill="none" d={edgePath} />
      <circle
        cx={toX}
        cy={toY}
        fill="black"
        r={1}
        stroke="black"
        strokeWidth={1}
      />
    </g> */}
      <BaseEdge id={id} path={edgePath} markerEnd={{
    type: MarkerType.Arrow,
    color: "black",
  }} />
      <EdgeLabelRenderer className="-z-20">
        <input
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className="z-30 w-16 text-center"
          defaultValue="관계"
        />
      </EdgeLabelRenderer>
    </>
  );
}

