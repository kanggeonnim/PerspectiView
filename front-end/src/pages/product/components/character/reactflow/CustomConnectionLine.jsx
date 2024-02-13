import { BaseEdge, EdgeLabelRenderer, getStraightPath } from "reactflow";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  connectionLineStyle,
  data,
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
      <path style={connectionLineStyle} fill="none" d={edgePath} />
      <BaseEdge
        id={id}
        path={edgePath}
        style={connectionLineStyle}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer className="-z-20">
        {data ? (
          <input
            style={{
              position: "absolute",
              pointerEvents: "all",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            className="z-30 w-16 text-center bg-transparent text-sm"
            defaultValue="관계"
          />
        ) : (
          <div
            style={{
              position: "absolute",
              pointerEvents: "all",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            className="z-30 w-16 text-center bg-transparent text-sm"
          >
            원수
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
}
