import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "allTheTasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.find((anytask) => anytask.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updateTaskName: (state, action) => {
      const { taskId, newTaskName } = action.payload;
      state.forEach((element) => {
        if (taskId === element.id) {
          element.text = newTaskName;
        }
      });

      const taskIdx = state.findIndex((task) => task.id === taskId);
      if (taskIdx) {
        console.log("task found " + taskIdx);
        state[taskIdx].text = newTaskName;
      }
    },
  },
});

export const { addTask, toggleTask, updateTaskName } = tasksSlice.actions;
export default tasksSlice.reducer;
