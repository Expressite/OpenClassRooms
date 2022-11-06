import { Link } from "react-router-dom";

function NotFound() {
    return(
        <div className="notFoundContainer">
            <div className="first">404</div>
            <div className="second">La page que vous demandez n'existe pas</div>
            <Link to="/">Retourner sur la page d'accueil</Link>
        </div>
    );
}

export default NotFound;