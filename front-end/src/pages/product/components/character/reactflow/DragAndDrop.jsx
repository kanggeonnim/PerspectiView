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
import useRelativeStore from "@/store/relative/useRelativeStore";
import useCharQueryModule from "@/hook/useCharQueryModule";



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

export default function DnD({ charDatas, idx, isSave }) {
  // get 받은 데이터들을 아래
  const { teamId, productId } = useParams();
  const flowKey = `relation${productId}`;
  const { createRelative } = useRelativeQueryModule(teamId, productId);
  const { relativeList, getRelativeListIsSuccess, relativeListIsLoading } = useRelativeQueryModule(
    teamId,
    productId
  );

  const setTable = JSON.parse(localStorage.getItem(flowKey));
  const reactFlowWrapper = useRef(null);
  const initialNodes = [];
  const initialEdges = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(setTable?.nodes || []);
  }, [setNodes, setTable?.nodes]);

  useEffect(() => {
    setEdges(setTable?.edges || []);
  }, [setEdges, setTable?.edges]);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [labelInput, setLabelInput] = useState("");
  const { setViewport } = useReactFlow();
  const { edgedatas, setEdgedatas, nodedatas, setNodedatas, relations, setRelations } =
    useRelativeStore();
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // const onSave = useCallback(() => {
  //   const datas = JSON.parse(localStorage.getItem(flowKey))
  //   // const nodeInfo = datas.nodes
  //   // const edgeInfo = edges.nodes
  //   // if (nodeInfo) {
  //   //   nodeInfo.map((data) => (
  //   //     charDatas.map((charData) => (
  //   //       ( data.id === charData.characterId ) ? console.log('yes') : console.log('NaN')
  //   //     ))
  //   //   ))
  //   // }
  //   // if (edgeInfo) {
  //   //   edgeInfo.map((data)=> console.log(data))
  //   // }
  // }, [reactFlowInstance]);

  // 저장 버튼 누를때 캐릭터 리스트와 화살표를 한번에 post

  const onTempoSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();

      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        // 받을 값이 있다면

        setNodes(flow.nodes || []);
        // 해당 콘솔 참조하고, 해당 파일의 포맷과 같이 바꾸면 될 것
        setEdges(flow.edges || []);
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
      const chardex = charDatas.map((chars) => chars.characterId);

      let findex = chardex.findIndex((v) => v === index);
      // 인덱스 추출

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
        //
      });

      const newNode =
        // 드랍으로 생성되는 인물의 정보
        {
          id: charDatas[findex].characterId.toString(),
          type,
          position,
          data: {
            name: charDatas[findex].characterName,
            image: charDatas[findex].characterImage,
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
            {/* <Button className="mr-2 bg-green-400" onClick={
              // () => {
              //     createRelative(relations);
              //   }

              onSave }>저장</Button> */}
            {/* FIXME DB 저장 차후 구현 */}
            {isSave ? (
              <Button className="mr-2" onClick={onTempoSave}>
              저장
              </Button>
            ):(
              <></>
            )}
            
            {/* <Button variant="secondary" className="border" onClick={onRestore}>
              불러오기
            </Button> */}
          </Panel>
          <DownloadButton />
        </ReactFlow>
      </div>
    </div>
  );
}
