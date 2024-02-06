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
