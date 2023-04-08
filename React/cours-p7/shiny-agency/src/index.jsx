import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Survey from "./pages/Survey";
import Header from "./components/Header";
import Freelances from "./pages/Freelances";
import Footer from "./components/Footer";
import Results from "./pages/Results";
import Error from "./components/Error";
import GlobalStyle from "./utils/style/GlobalStyle";
import { ThemeProvider, SurveyProvider } from "./utils/context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="survey/:questionNumber" element={<Survey />}></Route>
            <Route path="freelances" element={<Freelances />} />
            <Route path="results" element={<Results />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
