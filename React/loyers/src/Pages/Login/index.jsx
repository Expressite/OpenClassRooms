import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import * as constants from "../../utils/constants";

// Fonction pour vérifier si une adresse e-mail est valide
function isEmailValid(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

async function loginUser(credentials) {
  return fetch(`${constants.API_URL}auth/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",      
    },
    body: JSON.stringify(credentials),
    //credentials: "omit",
  })
    .then((data) => {
      if (data.ok) {
        return data.json();
      } else {
        const error = (data && data.message) || data.status;
        return Promise.reject(error);
      }
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
}

function Login({ setToken }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Vérifiez si l'adresse électronique est valide
    if (!isEmailValid(username)) {
      setMessage("L'adresse électronique n'est pas valide.");
      return;
    }

    const data = await loginUser({
      username,
      password,
    });
    
    if (data !== undefined) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user);
      localStorage.setItem("userType", data.usertype);
      setToken(data.token);
      navigate("/");
    } else {
      setMessage("L'authentification a échoué");
      setToken(null);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Identification</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Adresse électronique</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label>
            <p>Mot de passe</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="button-wrapper">
            <button type="submit" className="listButton">
              Valider
            </button>
          </div>
        </form>
        <br></br>
        <Link to="/Signin" className="bannerMenuElt">Créer un compte</Link>
      </div>
      <p>{message}</p>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
