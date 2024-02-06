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
      <div className="p-2 text-sm">{data.label}</div>
    </>
  );
}
