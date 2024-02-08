const onDragStart = (event, nodeType, id) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.setData("text/plain", id)
  event.dataTransfer.effectAllowed = "move";
};


export default function Char() {

  return (
    <div className="flex justify-center">
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "custom")}
        draggable
      >
        <div className="flex flex-col items-center w-max h-max">
          <img
            className="flex items-center justify-center w-24 h-24 border-dashed rounded-full"
            alt="cover of work"
          />
          <div className="m-2">철구</div>
        </div>
      </div>
      
    </div>
  );
}