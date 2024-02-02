// DnDFlow.js

import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType

} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
// import FloatingEdge from "./FloatingEdge";
import CustomConnectionLine from "./CustomConnectionLine";

import Sidebar from "./Sidebar";

import "./style.css";

const initialNodes = [];

let id = 0;
const getId = () => `${id++}`;
// const getId = () => `dndnode_${id++}`;
const nodeTypes = {
  custom: CustomNode,
};
const initialEdges = [];

const edgeTypes = {
  
};

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: 'black' },
  type: 'straight',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
};

export default function DnDFlow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [labelInput, setLabelInput] = useState("");

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");

    if (typeof type === "undefined" || !type) {
      return;
    }

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: {
        label: (
          <input
            className="flex items-center justify-center text-sm text-center bg-transparent"
            type="text"
            placeholder="Enter label"
            onChange={handleLabelInputChange}
            id={`${getId()}`}
            defaultValue={`${getId()}`}
          />
        ),
      },
      className:
        "w-24 h-24 !rounded-full flex items-center justify-center !bg-transparent",
      onchange: {},
    };

    setNodes((nds) => nds.concat(newNode));
  }, [reactFlowInstance, labelInput]);

  const handleLabelInputChange = (event) => {
    setLabelInput(event.target.value);
  };
  
  const connectionLineStyle = {
    strokeWidth: 1,
    stroke: 'black',
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            connectionLineComponent={CustomConnectionLine} // Use CustomConnectionLine for connection line
            snapToGrid
            snapGrid={[8, 8]}
            elementsSelectable={true} 
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineStyle={connectionLineStyle}
          > 
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
}
