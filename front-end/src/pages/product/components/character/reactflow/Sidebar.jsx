import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className='flex items-center flex-col'>
      <div className="description">드래그 하여 인물을 추가해보세요.</div>
      {/* <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div> */}
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        인물 추가
      </div>
      {/* TODO event, 'default' 표현식에 현재 인물 데이터를 받아와 노드명으로 넣거나,
       노드를 클릭시 노드명을 바꿀수 있게 하거나 하는 방법들을 갈구. */}
      {/* <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div> */}
    </aside>
  );
};
