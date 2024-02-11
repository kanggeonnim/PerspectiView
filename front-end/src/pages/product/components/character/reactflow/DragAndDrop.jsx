import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType,
  Panel,
  useReactFlow,
} from "reactflow";
import DownloadButton from "./DownloadButton";
import CustomNode from "./customnode/CustomNode";
import FloatingEdge from "./FloatingEdge";
import CustomConnectionLine from "./CustomConnectionLine";
import LabelNode from "./customnode/LabelNode";
import "./style.css";
import { Button } from "@/components/ui/button";
import useRelativeModule from "@/hook/useRelativeModule";
import useRelativeStore from "@/store/useRelativeStore";
import { json } from "react-router-dom";

const flowKey = "relation";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
});

let id = 0;
const getId = () => `${id++}`;

const nodeTypes = {
  custom: CustomNode,
  label: LabelNode,
};

const edgeTypes = {
  floating: FloatingEdge,
  custom: CustomConnectionLine,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "black" },
  type: "custom",

  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
};

export default function DnD({ users, charDatas, idx }) {
  const reactFlowWrapper = useRef(null);
  const { nodess, edgess, setNodess, setEdgess } = useRelativeStore(selector);
  // 윗줄 임시로 s하나씩 더 붙여서 구분
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [labelInput, setLabelInput] = useState("");
  const { setViewport } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      // console.log(flow)

      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  // 임시저장
  const onTempoSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const nodeFind = flow.nodes;
      const exNode = nodeFind.map((nodes) => 
        Object.fromEntries([
          Object.entries(nodes)[2],
          Object.entries(nodes)[4],
          Object.entries(nodes)[5],
        ])
      );
      const nodeSet = {nodes : exNode}
      console.log(nodeSet)
      // 객체에서 필요한 조건만 추출중
      // 필요조건에 안들어간건 default로
      // 필요 조건 2번 인덱스 에서 id
      // 4번 인덱스의 에서 position (이건 객체)
      // 5번 인덱스에서 name 이상 최소조건
      // localStorage.setItem(flowKey, JSON.stringify(flow));
      localStorage.setItem(flowKey, JSON.stringify(nodeSet))
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      console.log(flow);
      if (flow) {
        // const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        // setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

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

      if (!charDatas) return;
      // charDatas가 로딩 중이라면 빈 데이터를 반환하도록 처리
      const index = parseInt(idx);
      const chardex = charDatas.map((chars) => chars.id);

      let findex = chardex.findIndex((v) => v === index);
      // 인덱스 추출
      // console.log(findex)

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      // console.log("제 발", charDatas)
      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          name: charDatas[findex].name,
          label: (
            <>
              <input
                type="text"
                placeholder="label"
                onChange={handleLabelInputChange}
                id={`${getId()}`}
                defaultValue="인물관계"
              />
            </>
          ),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, labelInput, idx, charDatas]
  );

  const handleLabelInputChange = (event) => {
    setLabelInput(event.target.value);
  };

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
          connectionLineComponent={CustomConnectionLine}
          snapToGrid
          snapGrid={[8, 8]}
          elementsSelectable={true}
          defaultEdgeOptions={defaultEdgeOptions}
          className="download-image"
        >
          <Controls />
          {/* <DownloadButton /> */}
          <Panel position="top-right">
            {/* <Button className="mr-2 bg-green-400">저장</Button> */}
            {/* FIXME DB 저장 차후 구현 */}
            <Button className="mr-2" onClick={onTempoSave}>
              임시저장
            </Button>
            <Button variant="outline" onClick={onRestore}>
              불러오기
            </Button>
          </Panel>
          {/* <DownloadButton /> */}
        </ReactFlow>
      </div>
    </div>
  );
}
