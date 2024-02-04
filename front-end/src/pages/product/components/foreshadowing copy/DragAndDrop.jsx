import { useFshadow } from "@/store/useFshadow";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./Column";
import { ForeshadowingCreateCard } from "./ForeshadowingCreateCard";

const Container = styled.div`
  display: flex;
`;

export default function DragAndDrop() {
  //state는 {tasks:{각 복선 정보딕셔id,Name} ,columns:{각 컬럼 정보딕셔너리id,title,taksIds}, columnsOrder:[]}
  const { state, setState } = useFshadow((state) => ({
    state: state.allData,
    setState: state.setAllData,
  }));
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }
    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  return (
    <div>
      <ForeshadowingCreateCard />
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Container>
      </DragDropContext>
    </div>
  );
}
