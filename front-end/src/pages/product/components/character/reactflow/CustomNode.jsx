import React, { memo, useState } from "react";
import { Handle, Position, useStore } from "reactflow";

const connectionNodeIdSelector = (state) => state.connectionNodeId;

export default function CustomNode({ data, isConnectable }) {
  const [labelInput, setLabelInput] = useState("");
  const handleLabelInputChange = (event) => {
    setLabelInput(event.target.value);
  };

  let id = 0;
  const getId = () => `dndnode_${id++}`;
  // const connectionNodeId = useStore(connectionNodeIdSelector);
  // const isConnecting = !!connectionNodeId;


  
  return (
    <div
      id="this"
      className="flex items-center justify-center w-24 h-24 bg-transparent border-2 rounded-full"
    >
      <div className="flex items-center justify-center w-20 h-20">
        <div className="w=max h-max flex flex-col items-center">
          <input
            className="flex items-center justify-center w-20 text-sm text-center bg-transparent"
            type="text"
            placeholder="Enter label"
            onChange={handleLabelInputChange}
            id={`input ${getId()}`}
            defaultValue={`여기에 입력`}
          />
        </div>
        {/* <Handle type="target" position={Position.Top} isConnectable={isConnectable} /> */}
        {/* {!isConnecting && (
          <>
            <Handle
              className="-z-40 w-44 h-44 !bg-black-200 rounded-full !-top-2"
              type="source"
              position="top"
            />
            <Handle
              className="-z-40 w-44 h-44 !bg-black-200 rounded-full !-top-2"
              type="target"
              position="bottom"
            />
          </>
          // isConnecting의 다변화 필요
        )}
        <Handle
          className=" -z-50 w-44 h-44 !bg-black-200 !-top-2 rounded-full"
          type="target"
          position="top"
        />
        <Handle
          className=" -z-50 w-44 h-44 !bg-black-200 !-bottom-1 rounded-full"
          type="source"
          position="bottom"
        /> */}
        <div className="flex justify-center">
          <Handle
            type="target"
            position={Position.Bottom}
            id="a"
            isConnectable={isConnectable}
            className="!left-10 hover:!bg-red-500 !bg-transparent !border-0 !w-2 !h-2"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            isConnectable={isConnectable}
            className="!left-14 hover:!bg-blue-500 !bg-transparent !border-0 !w-2 !h-2"
          />
          <Handle
            type="target"
            position={Position.Right}
            id="c"
            isConnectable={isConnectable}
            className="!top-14 hover:!bg-red-500 !bg-transparent !border-0 !w-2 !h-2"
          />
          <Handle
            type="source"
            position={Position.Right}
            id="d"
            isConnectable={isConnectable}
            className="!top-10 hover:!bg-blue-500 !bg-transparent !border-0 !w-2 !h-2"
          />
          <Handle
            type="source"
            position={Position.Left}
            id="e"
            isConnectable={isConnectable}
            className="!top-14 hover:!bg-blue-500 !bg-transparent !border-0 !w-2 !h-2"
          />
          <Handle
            type="target"
            position={Position.Left}
            id="f"
            isConnectable={isConnectable}
            className="!top-10 hover:!bg-red-500 !bg-transparent !border-0 !w-2 !h-2"
          />
          <Handle
            type="source"
            position={Position.Top}
            id="g"
            isConnectable={isConnectable}
            className="!left-10 hover:!bg-blue-500 !bg-transparent !border-0 !w-2 !h-2"
          />
          <Handle
            type="target"
            position={Position.Top}
            id="h"
            // style={Nodecheck.bottom.bottomR}
            isConnectable={isConnectable}
            className="!left-14 hover:!bg-red-500 !bg-transparent !border-0 !w-2 !h-2"
          />
        </div>
      </div>
    </div>
  );
}
//  memo(CustomNode);
