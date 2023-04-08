import LanguageProvider from "./Components/LanguageProvider";
import LocalizedText from "./Components/LocalizedText";
import LanguageSwitcher from "./Components/LanguageSwitcher";
import "./App.css";

function App() {
  return (
    <LanguageProvider>
      <div>
        <h1>Texte</h1>
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
