import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as constants from "../../utils/constants";
import { getToken, postData, getMessage } from "../../utils/hooks";

function Logout({ setToken }) {
  const API_URL = `${constants.API_URL}auth/logout`;
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        localStorage.removeItem("token");
        setToken(null);
        await postData(API_URL, null, getToken());
        navigate("/login");
      } catch (error) {
        navigate("/login");
      }
    };

    performLogout();
  }, [API_URL, navigate]);

  return <div>Déconnexion en cours...</div>; // Renvoyer un élément JSX, par exemple un message de déconnexion
}

export default Logout;
