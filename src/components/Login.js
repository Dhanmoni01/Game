import React, { useState, useEffect } from "react";
import RollDice from "./RollDice";
import "./Login.css";

const LOGIN_CREDENTIALS = {
  phoneNumber: "8403967141",
  password: "HemantaHira@123",
};

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Logout after 3 hours
  useEffect(() => {
    if (isLoggedIn) {
      const logoutTimer = setTimeout(() => {
        alert("Session expired. Please log in again.");
        setIsLoggedIn(false);
      }, 3 * 60 * 60 * 1000); // 3 hours in milliseconds

      return () => clearTimeout(logoutTimer); // Clear timer if user logs out manually
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (
      phoneNumber === LOGIN_CREDENTIALS.phoneNumber &&
      password === LOGIN_CREDENTIALS.password
    ) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid phone number or password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPhoneNumber("");
    setPassword("");
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <div>
          <RollDice />
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="login-form">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
        </div>
      )}
    </div>
  );
}
