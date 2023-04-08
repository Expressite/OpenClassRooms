import TaskList from "../../components/TaskList";
function AllTasks() {
  return (
    <>
      <h1>Task List</h1>
      <TaskList filter="all"></TaskList>
    </>
  );
}

export default AllTasks;
