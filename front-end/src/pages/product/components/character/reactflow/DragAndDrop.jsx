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

import "./style.css";
import DownloadButton from "./DownloadButton";

const initialNodes = [
  
];

const initialEdges = [
 
];

let id = 0;
const getId = () => `${id++}`;

// let urlIdx = 0;
// const getUrlIdx = () => `${urlIdx++}`;
// let nameIdx = 0;
// const getNameIdx = () => `${nameIdx++}`;

const nodeTypes = {
  custom : CustomNode,
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

export default function DnDFlow({users,idx}) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [labelInput, setLabelInput] = useState("");

  const user = users
  const index = idx
  // 삼항 연산자 사용
  // console.log(user[idx-1].name)
  console.log(user[index])
  console.log(idx)

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
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
          image: {
            // url: user.users[document.getElementsByClassName(event.target.id)[0].id].url
            url: user[idx-1]
          },
          name : user[idx-1],
          label: (
            <>
            <input
              className="flex items-center justify-center text-sm text-center bg-transparent !p-0 !w-28"
              type="text"
              placeholder="label"
              onChange={handleLabelInputChange}
              id={`${getId()}`}
              defaultValue="인물관계"
            />
            </>
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
    </div>
  );
}
