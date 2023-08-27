import React from "react";
import { Provider } from "react-redux";
import AllTasks from "./pages/AllTasks";
import FinishedTasks from "./pages/FinishedTasks";
import Employees from "./pages/Employees";
import Header from "./components/Header";
import Footer from "./components/Footer";
import store from "./store/store";
import ThemeWrapper from "./components/ThemeWrapper";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ThemeWrapper>
          <Header></Header>
          <Routes>
            <Route exact path="/" element={<AllTasks />}></Route>
            <Route index path="alltasks" element={<AllTasks />}></Route>
            <Route path="finishedTasks" element={<FinishedTasks />}></Route>
            <Route path="employees" element={<Employees />}></Route>
          </Routes>
          <Footer></Footer>
        </ThemeWrapper>
      </Router>
    </Provider>
  );
}

export default App;
