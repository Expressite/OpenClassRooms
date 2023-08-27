import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";

function Footer() {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  function handleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(toggleTheme(newTheme));
  }
  return (
    <div className="footer">
      <button onClick={handleTheme}>Toggle Theme</button>
    </div>
  );
}

export default Footer;
