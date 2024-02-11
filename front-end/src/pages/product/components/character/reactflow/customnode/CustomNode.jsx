import { useState } from "react";
import { Handle, Position} from "reactflow";


export default function CustomNode({ data, isConnectable }) {
  const [labelInput, setLabelInput] = useState("");
  const handleLabelInputChange = (event) => {
    setLabelInput(event.target.value);
  };

  

  return (
    <>
      <div className="flex w-28 h-28 border items-center justify-center rounded-full">
        <div className="flex flex-col items-center justify-center w-28 h-28">
            <input
              className="text-sm text-center !w-28 bg-transparent"
              type="text"
              placeholder="Enter label"
              onChange={handleLabelInputChange}
              defaultValue={data.name}
            />
          </div>
          <div className="flex justify-center">
            {/* 핸들 블록 */}
            <Handle
              type="target"
              position={Position.Bottom}
              id="a"
              isConnectable={isConnectable}
              className="!left-12 hover:!bg-red-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
            />
            <Handle
              type="source"
              position={Position.Bottom}
              id="b"
              isConnectable={isConnectable}
              className=" !left-16 hover:!bg-blue-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
            />
            <Handle
              type="target"
              position={Position.Right}
              id="c"
              isConnectable={isConnectable}
              className="!top-16 hover:!bg-red-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
            />
            <Handle
              type="source"
              position={Position.Right}
              id="d"
              isConnectable={isConnectable}
              className="!top-12 hover:!bg-blue-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
            />
            <Handle
              type="source"
              position={Position.Left}
              id="e"
              isConnectable={isConnectable}
              className="!top-16 hover:!bg-blue-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
            />
            <Handle
              type="target"
              position={Position.Left}
              id="f"
              isConnectable={isConnectable}
              className="!top-12 hover:!bg-red-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
            />
            <Handle
              type="source"
              position={Position.Top}
              id="g"
              isConnectable={isConnectable}
              className="!left-12 hover:!bg-blue-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
            />
            <Handle
              type="target"
              position={Position.Top}
              id="h"
              isConnectable={isConnectable}
              className="!left-16 hover:!bg-red-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
            />
          </div>
        </div>
    </>
  );
}
