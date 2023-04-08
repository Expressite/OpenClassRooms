import logo from "../../images/logo.png";
import { Link} from "react-router-dom";

function Banner(){    
    return (
        <div className="banner">
            <div>
                <img src={logo} alt="Kasa" />
            </div>
            <nav className="bannerMenu">
                <Link to="/" className="bannerMenuElt">Accueil</Link>
                <Link to="/about" className="bannerMenuElt">A propos</Link>
            </nav>
        </div>        
    );
}

export default Banner;