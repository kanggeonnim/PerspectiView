import React, { useCallback, useRef } from 'react';

import ReactFlow, { addEdge, useNodesState, useEdgesState, MarkerType, Controls, updateEdge, useReactFlow,
  ReactFlowProvider, } from 'reactflow';


import 'reactflow/dist/base.css';

import CustomNode from './CustomNode';
import FloatingEdge from './FloatingEdge';
import CustomConnectionLine from './CustomConnectionLine';
import BiDirectionalEdge from './BiDirectionalEdge';
import BiDirectionalNode from './BiDirectionalNode';

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: 'black',
};

const nodeTypes = {
  custom: CustomNode,
  bidirectional: BiDirectionalNode,
};

const edgeTypes = {
  floating: FloatingEdge,
  bidirectional: BiDirectionalEdge,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
};


const initNodes = [
  {
    id: '1',
    type: 'custom',
    data: { name: '남주', job: 'CEO', emoji: '😎' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    data: { name: '여주', job: 'Designer', emoji: '🤓' },

    position: { x: -200, y: 200 },
  },
  {
    id: '3',
    type: 'custom',
    data: { name: '서브남주', job: 'Developer', emoji: '🤩' },
    position: { x: 200, y: 200 },
  },
];

const initEdges = [
  {
    source: '1',
    target: '2',
    id: '1',
    type : "bidirectional"
  },
];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineComponent={CustomConnectionLine}
      connectionLineStyle={connectionLineStyle}
      fitView
      className="bg-teal-50"
    >
    </ReactFlow>
  );
};

export default Flow;
