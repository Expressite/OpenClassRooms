import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import * as constants from "../../utils/constants";

async function loginUser(credentials) {
  return fetch(`${constants.API_URL}auth/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
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
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const data = await loginUser({
      username,
      password,
    });
    if (data !== undefined) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      console.log("user type : " + data.usertype);
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
            <p>Profil</p>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Mot de passe</p>
            <input
              type="password"
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
      <p>{message}</p>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
