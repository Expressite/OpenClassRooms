import { useDispatch } from "react-redux";
import { toggleTask, updateTaskName } from "../store/taskSlice";
import { useState } from "react";

function TaskListItem({ task }) {
  //lire le state à partir du reducer tasks
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const handleToggleTask = (id) => {
    dispatch(toggleTask(id));
  };

  const handleToggleMode = (id) => {
    setEditMode(!editMode);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditMode(false);
      const newName = e.target.value;
      dispatch(updateTaskName({ taskId: task.id, newTaskName: newName }));
    } else if (e.keyCode === 27) {
      setEditMode(false);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleToggleTask(task.id)}
      />

      {editMode === true ? (
        <input
          type="text"
          autoFocus
          defaultValue={task.text}
          onKeyDown={handleKeyDown}
        ></input>
      ) : (
        <span onClick={handleToggleMode}>{task.text}</span>
      )}
    </div>
  );
}

export default TaskListItem;
