import React from "react";
import { useSelector } from "react-redux";

function ThemeWrapper({ children }) {
  const theme = useSelector((state) => state.theme.value);
  return <div className={`themeWrapper theme-${theme}`}>{children}</div>;
}

export default ThemeWrapper;
