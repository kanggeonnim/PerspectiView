import React, { memo, useState } from "react";
import { Handle, Position, useStore } from "reactflow";

const connectionNodeIdSelector = (state) => state.connectionNodeId;

export default function CustomNode({ data, isConnectable }) {
  const [labelInput, setLabelInput] = useState("");
  const handleLabelInputChange = (event) => {
    setLabelInput(event.target.value);
  };
  const Placeholder = () => (
    <div className="placeholder">
      <img className="rounded-full" src="data:image/jpeg;base64,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" alt="" />
    </div>
  );
  // 축소시 표시되는 노드

  const zoomSelector = (s) => s.transform[2] >= 1.2;
  // 줌으로 인식하는 기준
  const showContent = useStore(zoomSelector);

  let id = 0;
  const getId = () => `dndnode_${id++}`;

  return (
    <>
      <div
        id="this"
        className="flex items-center justify-center !w-28 !h-28 bg-transparent border-2 rounded-full"
        >
      {showContent ? 
        <div className="flex items-center justify-center w-20 h-20">
          <div className="w=max h-max flex flex-col items-center">
            <input
              className="flex items-center justify-center w-20 text-sm text-center bg-transparent"
              type="text"
              placeholder="Enter label"
              onChange={handleLabelInputChange}
              id={`input ${getId()}`}
              defaultValue={"인물 정보 입력"}
            />
          </div>

          <div className="flex justify-center">
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
        :
        <Placeholder />
        }
      </div>
    </>
  );
}
