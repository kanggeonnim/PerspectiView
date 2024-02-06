import { useState } from "react";
import { Handle, Position} from "reactflow";


export default function CustomNode({ isConnectable }) {
  const [labelInput, setLabelInput] = useState("");
  const handleLabelInputChange = (event) => {
    setLabelInput(event.target.value);
  };

  

  return (
    <>
      <div className="flex items-center justify-center bg-transparent rounded-full">
        <div className="flex flex-col items-center justify-center w-28 h-28">
          <img src="" className="!w-28 !h-28 rounded-full" alt="" />
          <div className="w=max h-max flex flex-col items-center">
            <input
              className="flex items-center justify-center text-sm text-center bg-transparent !p-0 !w-28 z-10"
              type="text"
              placeholder="Enter label"
              onChange={handleLabelInputChange}
              defaultValue='321'
            />
          </div>
          <div className="flex justify-center">
            {/* 핸들 블록 */}
            <Handle
              type="target"
              position={Position.Bottom}
              id="a"
              isConnectable={isConnectable}
              className="!left-10 hover:!bg-red-500 !bg-transparent !border-0 !w-3 !h-3"
            />
            <Handle
              type="source"
              position={Position.Bottom}
              id="b"
              isConnectable={isConnectable}
              className="!left-14 hover:!bg-blue-500 !bg-transparent !border-0 !w-3 !h-3"
            />
            <Handle
              type="target"
              position={Position.Right}
              id="c"
              isConnectable={isConnectable}
              className="!top-14 hover:!bg-red-500 !bg-transparent !border-0 !w-3 !h-3"
            />
            <Handle
              type="source"
              position={Position.Right}
              id="d"
              isConnectable={isConnectable}
              className="!top-10 hover:!bg-blue-500 !bg-transparent !border-0 !w-3 !h-3"
            />
            <Handle
              type="source"
              position={Position.Left}
              id="e"
              isConnectable={isConnectable}
              className="!top-14 hover:!bg-blue-500 !bg-transparent !border-0 !w-3 !h-3"
            />
            <Handle
              type="target"
              position={Position.Left}
              id="f"
              isConnectable={isConnectable}
              className="!top-10 hover:!bg-red-500 !bg-transparent !border-0 !w-3 !h-3"
            />
            <Handle
              type="source"
              position={Position.Top}
              id="g"
              isConnectable={isConnectable}
              className="!left-10 hover:!bg-blue-500 !bg-transparent !border-0 !w-3 !h-3"
            />
            <Handle
              type="target"
              position={Position.Top}
              id="h"
              isConnectable={isConnectable}
              className="!left-14 hover:!bg-red-500 !bg-transparent !border-0 !w-3 !h-3"
            />
          </div>
        </div>
      </div>
    </>
  );
}
