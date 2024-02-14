import { useCallback } from "react";
import { useStore, getStraightPath, EdgeLabelRenderer, BaseEdge } from "reactflow";
import { Input } from "@/components/ui/input.jsx";
import { getEdgeParams } from "./utils.js";

function FloatingEdge({ id, source, target, markerEnd, connectionLineStyle }) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source.id), [source.id])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target.id), [target.id])
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return (
    <>
    {/* <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
      /> */}
      <BaseEdge id={id} path={edgePath} style={connectionLineStyle} markerEnd={markerEnd}/>
      <EdgeLabelRenderer className="-z-20">
        <div>
          <Input
          name="inputName"
          style={{
            position: "absolute",
            pointerEvents:"all",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          placeholder="관계"
          
        />
     
        </div>
        
      </EdgeLabelRenderer>
    </>
  );
}

export default FloatingEdge;
