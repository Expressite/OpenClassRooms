import React from "react";
import "./App.css";
import { LanguageProvider } from "./LanguageContext";
import { LocalizedText } from "./Components/LocalizedText";
import { LanguageSwitcher } from "./Components/LanguageSwitcher";
import { TopTitle } from "./Components/TopTitle";

function App() {
  return (
    <LanguageProvider>
      <div>
        <TopTitle title="Mon titre" count={1}></TopTitle>
        <h1>
          <LocalizedText id="title" />
        </h1>
        <p>
          <LocalizedText id="welcome" />
        </p>
        <LanguageSwitcher />
      </div>
    </LanguageProvider>
  );
}

export default App;
