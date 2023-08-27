import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="menuContainer">
      <Link to="alltasks">Toutes les tâches</Link>
      <Link to="finishedtasks">Taches terminées</Link>
      <Link to="employees">Employés</Link>
    </div>
  );
}

export default Header;
