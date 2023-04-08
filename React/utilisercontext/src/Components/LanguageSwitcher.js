import React, { useContext } from "react";
import { LanguageContext } from "../LanguageContext";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const handleChange = (event) => {
    setLanguage(event.target.value);
  };
  return (
    <div>
      <label htmlFor="language-select">Choose a language:</label>
      <select id="language-select" onChange={handleChange} value={language}>
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};
