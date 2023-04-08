import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../css/main.css';
import Banner from "./Banner";
import Footer from "./Footer";
import Home from "../Pages/Home";
import Details from "../Pages/Details";
import About from "../Pages/About";
import NotFound from "../Pages/NotFound";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Kasa";
  });
  return (
    <div className="App">
      <Router>
        <Banner></Banner>
        <div id="container" className="mainContainer">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
