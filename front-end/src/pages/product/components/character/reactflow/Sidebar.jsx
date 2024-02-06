
export default function Sidebar () {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  
  
  return (
    <>
      <div className="flex justify-center">
        <div className="dndnode" onDragStart={(event) => onDragStart(event, 'custom')} draggable>
          드래그 인물 추가
        </div>
      </div>
      <div className="flex justify-center">
        <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'label')} draggable>
          인물 관계 추가
        </div>
      </div>
    </>
  );
};
