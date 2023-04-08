import React from "react";
import { Provider } from "react-redux";
import TaskList from "./components/TaskList";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Task List</h1>
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
