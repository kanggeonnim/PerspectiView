import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./customnode/CustomNode";
import FloatingEdge from "./FloatingEdge";
import CustomEdge from "./CustomConnectionLine";
import LabelNode from "./customnode/LabelNode";

import Sidebar from "./Sidebar";

import "./style.css";
import DownloadButton from "./DownloadButton";

const initialNodes = [];

let id = 0;
const getId = () => `${id++}`;
const nodeTypes = {
  custom : CustomNode,
  label : LabelNode,
};
const initialEdges = [];

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: "black" },
  type: "straight",
  
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
};

export default function DnDFlow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [labelInput, setLabelInput] = useState("");

  const onConnect = useCallback(
  (params) => setEdges((eds) => addEdge(params, eds)),
  [setEdges]
);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
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
              className="flex items-center justify-center text-sm text-center bg-transparent !p-0 !w-28"
              type="text"
              placeholder="Enter label"
              onChange={handleLabelInputChange}
              id={`${getId()}`}
              defaultValue='인물관계 입력'
            />
          ),
        },
        className:
          "!rounded-full flex items-center justify-center !bg-transparent",
        onchange: {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, labelInput]
  );

  const handleLabelInputChange = (event) => {
    setLabelInput(event.target.value);
  };

  const connectionLineStyle = {
    strokeWidth: 1,
    stroke: "black",
  };

  const defaultViewport = { x: 0, y: 0, zoom: 1.2 };

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
            connectionLineComponent={CustomEdge} 
            snapToGrid
            snapGrid={[8, 8]}
            defaultViewport={defaultViewport}
            elementsSelectable={true}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineStyle={connectionLineStyle}
            className="download-image"
          >
            <Controls />
            <DownloadButton />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
}
