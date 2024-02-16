import { BaseEdge, EdgeLabelRenderer, getStraightPath } from "reactflow";
import React, { useState, useEffect } from "react";

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
  const [value, setValue] = useState("클릭하여 관계 입력");

  useEffect(() => {
    const storedValue = localStorage.getItem(`edgeLabel_${id}`);
    if (storedValue) {
      setValue(storedValue);
    }
  }, [id]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    localStorage.setItem(`edgeLabel_${id}`, e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <>
      <path style={connectionLineStyle} fill="none" d={edgePath} />
      <BaseEdge
        id={id}
        path={edgePath}
        style={connectionLineStyle}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer className="-z-20">
        {/* <div>
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
        </div> */}
        <div>
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
              style={{
                position: "absolute",
                pointerEvents: "all",
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              }}
              className="text-sm"
            />
          ) : (
            <div
              onClick={handleDoubleClick}
              style={{
                position: "absolute",
                pointerEvents: "all",
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              }}
              className="text-sm"
            >
              {value}
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
