export default function LabelAdd() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="flex justify-center border-2 p-3 rounded-full">
      <div
        className="dndnode input flex items-center"
        onDragStart={(event) => onDragStart(event, "label")}
        draggable
      >
        인물 관계 추가
      </div>
    </div>
  );
}
