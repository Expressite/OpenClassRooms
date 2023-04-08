import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleTask } from "../store/taskSlice";

function TaskList() {
  //lire le state à partir du reducer tasks
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    const newTask = { id: Date.now(), text: "New task", completed: false };
    dispatch(addTask(newTask));
  };

  const handleToggleTask = (id) => {
    dispatch(toggleTask(id));
  };

  return (
    <div>
      <button onClick={handleAddTask}>Add Task</button>
      {tasks.map((task) => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggleTask(task.id)}
          />
          <span>
            {task.text} ({task.id})
          </span>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
