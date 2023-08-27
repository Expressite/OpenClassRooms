import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";
import TaskListItem from "./TaskListItem";
import { FilteredTasksList } from "../store/selectors";
import { STATUS } from "../constants";
function TaskList({ filter }) {
  //lire le state à partir du reducer tasks
  /*
  Une apprroche classique consiste à lire toutes les tâches à l'aide de useSelector et de les filtrer ensuite
  var tasks = useSelector((state) => state.tasks);
  if (filter === STATUS.FINISHED) {
    tasks = tasks.filter((t) => t.completed === true);
  }
*/
  /*
On peut déplacer ce filtrage dans un sélecteur dédié (ici FilteredTasksList) pour alléger le code et surtout
permettre la réutilisation de ce filtrage
*/
  var tasks = useSelector(FilteredTasksList(filter));

  const dispatch = useDispatch();

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      text: "Nouvelle tâche",
      completed: false,
    };
    dispatch(addTask(newTask));
  };

  return (
    <div>
      <p>Filtre : {filter}</p>
      {filter === STATUS.ALL ? (
        <>
          <button onClick={handleAddTask}>Nouvelle tâche à créer</button>
          <div id="newTaskWindow">
            <span>Tâche :</span>
            <input type="text" id="newTaskName"></input>
          </div>
        </>
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
