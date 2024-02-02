import React from 'react';
import { getStraightPath, EdgeLabelRenderer } from 'reactflow';

function CustomConnectionLine({ fromX, fromY, toX, toY, connectionLineStyle }) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  return (
    <>
    <g>
      <path style={connectionLineStyle} fill="none" d={edgePath} />
      <circle cx={toX} cy={toY} fill="black" r={1} stroke="black" strokeWidth={1} />
    </g>
    
    </>
  );
}

export default CustomConnectionLine;
