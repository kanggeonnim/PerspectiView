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
import CustomConnectionLine from "./CustomConnectionLine";
import LabelNode from "./customnode/LabelNode";
import "./style.css";
import { Button } from "@/components/ui/button";
import useRelativeQueryModule from "@/hook/useRelativeQueryModule";
import { useParams } from "react-router-dom";
import useNodeStore from "@/store/useNodeStore";
import useCharStore from "@/store/useCharStore";
import useRelativeStore from "@/store/relative/useRelativeStore";
import useCharQueryModule from "@/hook/useCharQueryModule";

const flowKey = "relation";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
});

const nodeTypes = {
  custom: CustomNode,
  label: LabelNode,
};

const edgeTypes = {
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

export default function DnD({ charDatas, idx }) {
  // get 받은 데이터들을 아래
  const { teamId, productId } = useParams();
  const { relativeList, getRelativeListIsSuccess } = useRelativeQueryModule(teamId, productId);

  // let id = 1;
  // const getId = () => `${id++}`;

  console.log(relativeList);
  // TODO 관계 조회 작성중
  // relativeList?.map((relat) =>
  // relat.
  // )

  const initialNodes = [
    // {
    //   id: charDatas[1].characterId.toString(),
    //   data: { name: charDatas[1].characterName, image: charDatas[1].characterImage },
    //   position: { x: charDatas[1].characterPositionX, y: charDatas[1].characterPositionY },
    //   type: "custom",
    // },
    // {
    //   id: charDatas[2].characterId.toString(),
    //   data: { name: charDatas[2].characterName, image: charDatas[2].characterImage },
    //   position: { x: 400, y: 100 },
    //   type: "custom",
    // },
    // {
    //   id: charDatas[7].characterId.toString(),
    //   data: { name: charDatas[7].characterName, image: charDatas[7].characterImage },
    //   position: { x: 100, y: 400 },
    //   type: "custom",
    // },
    // {
    //   id: charDatas[4].characterId.toString(),
    //   data: { name: charDatas[4].characterName, image: charDatas[4].characterImage },
    //   position: { x: 400, y: 400 },
    //   type: "custom",
    // },
  ];

  const initialEdges = [
    // {
    //   id: "e1-2",
    //   data: {
    //     label: "원수",
    //   },
    //   source: charDatas[2].characterId.toString(),
    //   sourceHandle: "b",
    //   target: charDatas[4].characterId.toString(),
    //   targetHandle: "h",
    // },
    // {
    //   id: `${charDatas[2].characterId}-${charDatas[4].characterId}`,
    //   data: {
    //     label: "불륜",
    //   },
    //   source: charDatas[2].characterId.toString(),
    //   sourceHandle: "b",
    //   target: charDatas[7].characterId.toString(),
    //   targetHandle: "h",
    // },
  ];

  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [labelInput, setLabelInput] = useState("");
  const { setViewport } = useReactFlow();
  const { edgedata, setEdgedata, nodedata, setNodedata } = useRelativeStore();
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  // 저장 버튼 누를때 캐릭터 리스트와 화살표를 한번에 post
  const onTempoSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      setEdgedata(flow.edges);
      setNodedata(flow.nodes);
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance, setEdgedata]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      // console.log(flow);
      if (flow) {
        // const { x = 0, y = 0, zoom = 1 } = flow.viewport;

        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        // setViewport({ x, y, zoom });
      }
      // 마우스를 뗄 떼마다 POST
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
      const chardex = charDatas.map((chars) => chars.characterId);

      let findex = chardex.findIndex((v) => v === index);
      // 인덱스 추출
      console.log(findex);

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
        //
      });

      const newNode = {
        id: charDatas[findex].characterId.toString(),
        type,
        position,
        data: {
          name: charDatas[findex].characterName,
          charId: charDatas[findex].characterId,
          image: charDatas[findex].characterImage,
          label: (
            <>
              <input
                type="text"
                placeholder="label"
                onChange={handleLabelInputChange}
                // id={`${getId()}`}
                defaultValue="인물관계"
              />
            </>
          ),
        },
      };

      console.log(newNode.position.x);

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
          <DownloadButton />
        </ReactFlow>
      </div>
    </div>
  );
}
