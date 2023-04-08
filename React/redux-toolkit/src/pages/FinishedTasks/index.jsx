import TaskList from "../../components/TaskList";
function FinishedTasks() {
  return (
    <>
      <h1>Tâches terminées</h1>
      <TaskList filter="finished"></TaskList>
    </>
  );
}

export default FinishedTasks;
