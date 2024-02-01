import React, { memo } from 'react';
import { Handle, Position, useStore } from 'reactflow';


const connectionNodeIdSelector = (state) => state.connectionNodeId;

function CustomNode({ data, id }) {
  
  const connectionNodeId = useStore(connectionNodeIdSelector);
  
  const isConnecting = !!connectionNodeId;  
  const isTarget = connectionNodeId && connectionNodeId !== id;

  return (
      <div className="flex items-center justify-center w-32 h-32 m-1 bg-white border-2 rounded-full shadow-md">
        <div className="w-max h-max">
          <div className="w=max h-max flex flex-col items-center">
            <div className="text-sm font-bold w-max h-max">{data.name}</div>
            <div className="text-sm text-gray-500 w-max h-max">{data.job}</div>
          </div>
          {!isConnecting && (
              <Handle className="-z-40 w-44 h-44 !bg-transparent rounded-full !-top-5" type="source"/>
              
            )}
          <Handle type="target" isConnectableStart={false} className=" -z-50 w-44 h-44 !bg-transparent !-top-5 rounded-full" />
        </div>
      </div>
  );
}

export default memo(CustomNode);
