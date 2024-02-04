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
              // style={Nodecheck.bottom.bottomR}
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
