import React from 'react';
import { getStraightPath } from 'reactflow';

function CustomEdge({id, fromX, fromY, toX, toY, connectionLineStyle }) {
  const [edgePath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,

  });

  return (
    <g>
      <path style={connectionLineStyle} fill="none" d={edgePath} />
      <circle cx={toX} cy={toY} fill="black" r={1} stroke="black" strokeWidth={1} />
    </g>
  );
}

export default CustomEdge;

// import React from 'react';
// import { getStraightPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';
 
// function CustomEdge({id, fromX, fromY, toX, toY, sourcePosition, targetPosition, connectionLineStyle  }) {
//   const [edgePath, labelX, labelY] = getStraightPath({
//     sourceX: fromX,
//     sourceY: fromY,
//     targetX: toX,
//     targetY: toY,
//     sourcePosition,
//     targetPosition,

//   });
//   return (
//     <>
//       <BaseEdge id={id} path={edgePath} />
//       <EdgeLabelRenderer>
//         <div
//           style={{
//             position: 'absolute',
//             transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
//             background: 'bg-transparent',
//             padding: 10,
//             borderRadius: 5,
//             fontSize: 12,
//             fontWeight: 700,
//           }}
//           className="nodrag nopan"
//         >
//           123
//         </div>
//       </EdgeLabelRenderer>
//     </>
//   );
// };
 
// export default CustomEdge;