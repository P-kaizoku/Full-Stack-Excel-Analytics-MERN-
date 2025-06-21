import { login } from "../../services/auth.js";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "../Navbar.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [darkMode, setDarkMode] = useState(true);
  // const [language, setLanguage] = useState("en");
  const [error] = useState(""); // Kept for future use if needed

  const navigate = useNavigate();

  // useEffect(() => {
  //   document.body.className = darkMode ? "dark-mode" : "light-mode";
  // }, [darkMode]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await login({ email, password });

    if (res.success) {
      navigate("/dashboard");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="login-page">
      <Navbar />

      <div className="content">
        <div className="form-container">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <select>
              <option>User</option>
              <option>Admin</option>
            </select>
            <button type="submit">Login</button>
            <p className="switch-auth">
              Don't have an account? <a href="/register"> Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
