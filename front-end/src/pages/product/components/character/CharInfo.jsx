
export default function CharInfo({ user, onIdxChange }) {
  const onDragStart = (event, nodeType, id) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
    onIdxChange(event.target.id)

  };
  


  return (
    <div className="flex justify-center">
      <div
        className={`dndnode${user.id}`}
        onDragStart={(event) => onDragStart(event, "custom", event.target.id)}
        draggable
        id={user.id}
      >
        <div className="flex flex-col items-center w-max h-max">
          <img
            className="flex items-center justify-center w-24 h-24 border-dashed rounded-full"
            src={user.url}
            alt="cover of work"
            id={user.id}
            key={user.id}
          />
          <div className="m-2">{user.name}</div>
        </div>
      </div>
      
    </div>
  );
}