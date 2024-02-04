import React, { memo, useState } from "react";
import { useStore, NodeResizer } from "reactflow";

export default function LabelNode({ data, isConnectable, selected }) {



  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={30}
        minHeight={15}
      />
      <div style={{ padding: 10 }}>{data.label}</div>
    </>
    // <div className="flex items-center justify-center z-10">
    //   <div className="h-max flex flex-col items-center">
    //     <input
    //       className=" w-3/4 flex items-center justify-center text-sm text-center bg-transparent"
    //       type="text"
    //       placeholder="Enter label"
    //       onChange={handleLabelInputChange}
    //       id={`input ${getId()}`}
    //       defaultValue={`인물 관계`}
    //     />
    //   </div>

    // </div>
  );
}
