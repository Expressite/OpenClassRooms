import React, { createContext, useState } from "react";

export const LanguageContext = createContext({
  language: "fr",
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("fr");
  const value = {
    language,
    setLanguage,
  };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
