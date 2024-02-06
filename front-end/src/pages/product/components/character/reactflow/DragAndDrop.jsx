import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType,
} from "reactflow";
import CustomNode from "./customnode/CustomNode";
import FloatingEdge from "./FloatingEdge";
import CustomEdge from "./CustomConnectionLine";
import LabelNode from "./customnode/LabelNode";

import Sidebar from "./Sidebar";

import "./style.css";
import DownloadButton from "./DownloadButton";

const initialNodes = [
  {
    id: "1",
    type: "custom",
    data: { label: "맨유" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "custom",
    data: { label: "아스날" },
    position: { x: 200, y: 0 },
  },
  {
    id: "3",
    type: "custom",
    data: { label: "리버풀" },
    position: { x: 0, y: 200 },
  },
  {
    id: "4",
    type: "custom",
    data: { label: "브라이튼" },
    position: { x: -200, y: -200 },
  },
  {
    id: "5",
    type: "label",
    data: { label: "123" },
    position: { x: 125, y: 15 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", sourceHandle: "d", targetHandle: "f" },
  { id: "e2-1", source: "2", target: "1", sourceHandle: "e", targetHandle: "c" },
  { id: "e1-3", source: "1", target: "3", sourceHandle: "b", targetHandle: "h" },
  { id: "e1-4", source: "1", target: "4", sourceHandle: "e", targetHandle: "a" },
];

let id = 0;
const getId = () => `${id++}`;
const nodeTypes = {
  custom: CustomNode,
  label: LabelNode,
};

const edgeTypes = {
  floating: FloatingEdge,
  custom: CustomEdge,
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
              defaultValue="인물관계 입력"
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

  const defaultViewport = { x: 300, y: 250, zoom: 0.9 };

  return (
    <div className="dndflow">
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
    </div>
  );
}
