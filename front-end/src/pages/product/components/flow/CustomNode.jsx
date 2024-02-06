import { Plus } from "lucide-react";
import { Handle, Position } from "reactflow";

export default function CustomNode({ id, data }) {
  return (
    <div
      className="flex items-center justify-center w-32 h-40 p-4 border rounded"
      style={{
        borderColor: `${data.color}`,
      }}
    >
      <div>{data.title}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

// export default CustomNode;
// .react-flow__node-mindmap {
//   background: white;
//   border-radius: 2px;
//   border: 1px solid transparent;
//   padding: 2px 5px;
//   font-weight: 700;
// }
