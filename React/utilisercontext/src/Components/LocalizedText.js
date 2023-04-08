import React, { useContext } from "react";
import { LanguageContext } from "../LanguageContext";

export const LocalizedText = ({ id }) => {
  const { language } = useContext(LanguageContext);
  const messages = require(`../lang/${language}.js`);
  return <span>{messages[id]}</span>;
};
