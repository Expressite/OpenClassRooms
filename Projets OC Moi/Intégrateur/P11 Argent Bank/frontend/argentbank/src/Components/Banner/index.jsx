import logo from "../../Images/argentBankLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/tokenSlice";

function Banner() {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Supprimer le token
    dispatch(setToken(""));
    // Rediriger vers la page d'accueil
    navigate("/");
  };

  return (
    <div className="bannerContainer flex flexHorizontal">
      <div id="logoPart">
        <Link to="/">
          <img src={logo} alt="Argent Bank logo" />
        </Link>
      </div>
      <div>
        <nav>
          {!token && (
            <Link to="/login">
              <FontAwesomeIcon icon={faUser} />
              &nbsp;Sign In
            </Link>
          )}
          {token && (
            <>
              <Link to="/transactions">
                <FontAwesomeIcon icon={faUser} />
                &nbsp;{user.firstName}
              </Link>
              &nbsp;
              <Link to="/" onClick={handleSignOut}>
                <FontAwesomeIcon icon={faSignOut} />
                &nbsp;Sign Out
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
export default Banner;
