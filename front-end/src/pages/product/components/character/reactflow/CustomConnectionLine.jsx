import { BaseEdge, EdgeLabelRenderer, getStraightPath } from "reactflow";
import { useState } from "react";

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

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("Click to edit");

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

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
        {/* <input
          style={{
            position: "absolute",
            pointerEvents: "all",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className="z-30 w-16 text-center bg-transparent text-sm"
          defaultValue="관계"
        /> */}
        <div>
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                position: "absolute",
                pointerEvents: "all",
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              }}
              className="z-30 w-16 text-center bg-transparent text-sm"
              autoFocus
            />
          ) : (
            <div
              onClick={handleDoubleClick}
              style={{
                position: "absolute",
                pointerEvents: "all",
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              }}
              className="z-30 w-16 text-center bg-transparent text-sm"
            >
              {value}
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
