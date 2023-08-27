import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import * as constants from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/tokenSlice";
import { setUser } from "../../store/userSlice";

async function loginUser(credentials) {
  return fetch(`${constants.API_URL}user/login`, {
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

async function getUser(token) {
  const auth = `Bearer ${token}`;
  return fetch(`${constants.API_URL}user/profile`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: "",
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

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    setMessage("");
    const loginData = await loginUser({
      email,
      password,
    });
    if (loginData !== undefined) {
      //save token
      dispatch(setToken(loginData.body.token));
      //get user informations
      const profileData = await getUser(loginData.body.token);
      if (profileData !== undefined) {
        //save user informations
        dispatch(setUser(profileData.body));
        navigate("/transactions");
      } else {
        setMessage("Impossible de lire les données du profil");
      }
      navigate("/transactions");
    } else {
      setMessage("L'authentification a échoué");
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUser} />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
        <p>{message}</p>
      </section>
    </main>
  );
}

export default Login;
