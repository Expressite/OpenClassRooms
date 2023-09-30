import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import * as constants from "../../utils/constants";
import ErrorMessage from "../../Components/ErrorMessage";

// Fonction pour vérifier si une adresse e-mail est valide
function isEmailValid(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

async function signinUser(credentials) {
  return fetch(`${constants.API_URL}auth/signin`, {
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
        return data.json().then((responseData) => {
          const errorMessage = responseData.message || "Une erreur inconnue s'est produite.";
          const returnCode = responseData.returnCode || -1; // Valeur par défaut -1 si returnCode n'est pas défini
          return Promise.reject({ returnCode, message: errorMessage });
        });
      }
      
    })
    .catch((error) => {
      console.error("There was an error!", error);
      return { message: error.message, returnCode: -1 };
    });
}

function Signin({ setToken }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showConnectionLink, setShowConnectionLink] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("error");
  const [timeOutDuration, setTimeOutDuration] = useState(30000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!isEmailValid(username)) {
      setMessage("L'adresse électronique n'est pas valide.");
      return;
    }

    const data = await signinUser({
      username,
      password,
    });
    
    console.log(data);
    if (data !== undefined) {
      if (data.returnCode === 0) {
        setShowConnectionLink(true);
        setMessageType("info");
      } else {
        setShowConnectionLink(false);
        setMessageType("error");        
        setTimeOutDuration(timeOutDuration + 1);
      }
      setMessage(data.message);
    } 
  };

  return (
    <div className="signin-wrapper">
      <h1>Création de compte</h1>
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
      </div>
      <ErrorMessage message={message} timeout={timeOutDuration} type={messageType}/>
      {showConnectionLink && (
        <div id="connectionLink">
          <Link to="/login">
            Se connecter
          </Link>
        </div>
      )}
    </div>
  );
}

Signin.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Signin;
