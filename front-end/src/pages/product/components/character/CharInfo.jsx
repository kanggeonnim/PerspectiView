export default function CharInfo({ charData, onIdxChange }) {
  const onDragStart = (event, nodeType, id) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
    onIdxChange(event.target.id);
    // console.log(event.target.id)
  };

  return (
    <div className="flex justify-center">
      <div
        className={`dndnode${charData.id}`}
        onDragStart={(event) => onDragStart(event, "custom", event.target.id)}
        draggable
        id={charData.id}
      >
        <div className="flex flex-col items-center w-max h-max">
          <img
            className="flex items-center justify-center w-24 h-24 border-dashed rounded-full"
            src={charData.image}
            alt="cover of work"
            id={charData.id}
            key={charData.id}
          />
          <div className="m-2">{charData.name}</div>
        </div>
      </div>
    </div>
  );
}
