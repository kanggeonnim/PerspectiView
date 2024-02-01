import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
// 원래 이거 밑에 추가되있었음.
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: orange;
//   border-radius: 4px;
//   margin-right: 8px;
// `;

export default function Task(props) {
  return (
    <Draggable draggableId={props.task.fshadowId} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
        >
          {/* <button
            type="button"
            onClick={() => {
              const newState = [...state];
              newState[ind].splice(index, 1);
              setState(newState.filter((group) => group.length));
            }}
          >
            delete
          </button> */}
          {props.task.fshadowName}
        </Container>
      )}
    </Draggable>
  );
}
