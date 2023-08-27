import logo from "../../Images/key_100x100.png";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="bannerContainer flex flexHorizontal">
      <div id="logoPart" className="flex flexHorizontal">
        <img src={logo} alt="logo" />
        <div className="bannerTextLogo">
          <p>
            &nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p>
            &nbsp;/&nbsp;_&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p>
            /&nbsp;/_\&nbsp;\_&nbsp;__&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;__|&nbsp;|_&nbsp;&nbsp;&nbsp;_&nbsp;_&nbsp;__&nbsp;
          </p>
          <p>
            |&nbsp;&nbsp;_&nbsp;&nbsp;|&nbsp;'_&nbsp;`&nbsp;_&nbsp;\/&nbsp;__|/&nbsp;_`&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;'__|
          </p>
          <p>
            |&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;\__&nbsp;\&nbsp;(_|&nbsp;|&nbsp;|_|&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;
          </p>
          <p>\_|&nbsp;|_/_|&nbsp;|_|&nbsp;|_|___/\__,_|\__,_|_|&nbsp;</p>
        </div>
      </div>
      <nav className="bannerMenu">
        <Link to="/" className="bannerMenuElt">
          Loyers
        </Link>
        <Link to="/Appartments" className="bannerMenuElt">
          Appartements
        </Link>
        <Link to="/Tenants" className="bannerMenuElt">
          Locataires
        </Link>
        <Link to="/Contracts" className="bannerMenuElt">
          Contrats
        </Link>
      </nav>
    </div>
  );
}
export default Banner;
