import React from 'react';
import { getStraightPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';
 
function FloatingEdge({id, fromX, fromY, toX, toY, sourcePosition, targetPosition, connectionLineStyle  }) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
    sourcePosition,
    targetPosition,

  });
 
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <input
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: 'bg-transparent',
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
          }}
          defaultValue={1232}
          className="nodrag nopan"
        />
          
      </EdgeLabelRenderer>
    </>
  );
};
 
export default FloatingEdge;