import { ScrollArea } from "@/components/ui/scroll-area";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
`;

export default function Column(props) {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          //innerRef가 아닌 ref (styledcomponent관련??)
          <ScrollArea className="border border-red-500 h-72">
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              $isDraggingOver={snapshot.isDraggingOver}
            >
              {props.tasks.map((task, index) => (
                <Task key={task.fshadowId} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          </ScrollArea>
        )}
      </Droppable>
    </Container>
  );
}
