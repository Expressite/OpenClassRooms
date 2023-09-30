import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./css/main.css";
import Banner from "./Components/Banner";
//import Footer from "./Footer";
import Appartments from "./Pages/Appartments";
import Login from "./Pages/Login";
import Signin from "./Pages/Signin";
import Logout from "./Pages/Logout";
import Rents from "./Pages/Rents";
import Tenants from "./Pages/Tenants";
import Contracts from "./Pages/Contracts";
import NotFound from "./Pages/NotFound";
import { useEffect } from "react";
import AppartementPrices from "./Pages/AppartmentPrices";

const theme = createTheme({
  typography: {
    fontFamily: "80sFont",
  },
});

function App() {
  useEffect(() => {
    document.title = "Loyers";
  });
  let [token, setToken] = useState();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Banner></Banner>
          <div id="container" className="mainContainer">
            <Routes>
              <Route path="/" element={<Rents />} />
              <Route path="/Appartments" element={<Appartments />} />
              <Route
                path="/AppartmentPrices/:id"
                Component={AppartementPrices}
              />
              <Route path="/Tenants" element={<Tenants />} />
              <Route path="/Contracts" element={<Contracts />} />
              <Route path="/Login" element={<Login setToken={setToken} />} />
              <Route path="/Logout" element={<Logout setToken={setToken} />} />
              <Route path="/Signin" element={<Signin setToken={setToken} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          {/*<Footer></Footer>*/}
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
