import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Transactions from "./Pages/Transactions";
import Main from "./Pages/Main";
import NotFound from "./Pages/NotFound";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  useEffect(() => {
    document.title = "Argent Bank";
  });
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Banner></Banner>
          <div id="container" className="mainContainer">
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer></Footer>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
