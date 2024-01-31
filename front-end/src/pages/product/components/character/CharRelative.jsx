import React from "react";
import ReactFlow from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 200 }, data: { label: "2" } },
  { id: "3", position: { x: 200, y: 200 }, data: { label: "3" } },
];
const initialEdges = [
  { id: "e1-3", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
];

export default function CharRelative() {
  return (
    <div className="w-max h-max">
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}