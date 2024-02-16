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
import html2canvas from "html2canvas";

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
  const { productId } = useParams();
  const flowKey = `relation${productId}`;

  const setTable = JSON.parse(localStorage.getItem(flowKey));
  const reactFlowWrapper = useRef(null);
  const initialNodes = [];
  const initialEdges = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(setTable?.nodes || []);
  }, []);

  useEffect(() => {
    setEdges(setTable?.edges || []);
  }, []);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  // 저장 버튼 누를때 캐릭터 리스트와 화살표를 한번에 post

  const onTempoSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();

      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance, flowKey]);

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
  }, [setNodes, flowKey, setEdges]);

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
    [reactFlowInstance, idx, charDatas, setNodes]
  );

  const downloadImage = () => {
    const node = document.querySelector(".react-flow__viewport"); // 변환할 DOM 요소의 ID
    console.log(node);
    html2canvas(node)
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = canvas.toDataURL();
        link.click();
      })
      .catch((error) => {
        console.error("이미지 저장 중 오류 발생:", error);
      });
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
          <Panel position="top-right">
            {isSave ? (
              <>
                <Button className="mr-2" onClick={onTempoSave}>
                  저장
                </Button>
                {/* <Button
                  variant="secondary"
                  className="border"
                  onClick={onRestore}
                >
                  불러오기
                </Button> */}
              </>
            ) : (
              <></>
            )}
          </Panel>
          <Panel position="">
            <Button
              className="font-bold download-btn"
              variant="destructive"
              onClick={downloadImage}
            >
              이미지로 저장
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}
