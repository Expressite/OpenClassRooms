import React from "react";
import { Provider } from "react-redux";
import AllTasks from "./pages/AllTasks";
import FinishedTasks from "./pages/FinishedTasks";
import Header from "./components/Header";
import store from "./store/store";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header></Header>
        <Routes>
          <Route index path="alltasks" element={<AllTasks />}></Route>
          <Route path="finishedTasks" element={<FinishedTasks />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
