import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";
import TaskListItem from "./TaskListItem";

function TaskList({ filter }) {
  //lire le state à partir du reducer tasks
  var tasks = useSelector((state) => state.tasks);
  if (filter === "finished") {
    tasks = tasks.filter((t) => t.completed === true);
  }

  const dispatch = useDispatch();

  const handleAddTask = () => {
    const newTask = { id: Date.now(), text: "New task", completed: false };
    dispatch(addTask(newTask));
  };

  return (
    <div>
      <p>Filtre : {filter}</p>
      {filter === "all" ? (
        <button onClick={handleAddTask}>Nouvelle tâche</button>
      ) : (
        ""
      )}
      {tasks.map((task) => (
        <TaskListItem task={task} key={task.id}></TaskListItem>
      ))}
    </div>
  );
}

export default TaskList;
