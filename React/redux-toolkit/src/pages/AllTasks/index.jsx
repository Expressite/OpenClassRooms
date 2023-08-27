import TaskList from "../../components/TaskList";
import { STATUS } from "../../constants";
function AllTasks() {
  return (
    <>
      <h1>Task List</h1>
      <TaskList filter={STATUS.ALL}></TaskList>
    </>
  );
}

export default AllTasks;
