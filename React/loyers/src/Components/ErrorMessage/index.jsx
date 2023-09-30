import React, { useState, useEffect } from "react";

const ErrorMessage = ({ message, timeout = 3000, type = "error" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let timeoutId;

    if (message) {
      setIsVisible(true);
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, timeout);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, timeout]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setKey((prevKey) => prevKey + 1);
      }, 10);
    }
  }, [message]);

  return isVisible ? (
    <div
      key={key}
      className={`fade-out-message ${!isVisible ? "fade-out" : ""} ${type === "error" ? "error-message" : "info-message"}`}
    >
      <span>{message}</span>
    </div>
  ) : null;
};

export default ErrorMessage;
