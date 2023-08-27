import TaskList from "../../components/TaskList";
import { STATUS } from "../../constants";
function FinishedTasks() {
  return (
    <>
      <h1>Tâches terminées</h1>
      <TaskList filter={STATUS.FINISHED}></TaskList>
    </>
  );
}

export default FinishedTasks;
