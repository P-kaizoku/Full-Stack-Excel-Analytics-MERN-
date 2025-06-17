import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");
  const [error] = useState(""); // Kept for future use if needed

  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const handleLogin = async (e) => {
    e.preventDefault();
    // 🚨 Force redirect without checking login response
    navigate("/dashboard");
  };

  const content = {
    en: {
      heading: "Visualize your Data\nwith us",
      subtext:
        "Upload, visualize, and transform your spreadsheets into interactive charts and reports with just a few clicks.",
      platform: "Welcome to your own platform — Visualxcel",
      welcome: "Welcome Back",
      loginBtn: "Login",
      registerPrompt: "Don’t have an account?",
      registerLink: "Register",
    },
  };

  const t = content[language] || content.en;

  return (
    <div className="login-page">
      <nav className="navbar">
        <div className="navbar-left">🟩📊 Excel Analytics Platform</div>
        <div className="navbar-right">
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English (United States)</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
          </select>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light" : "Dark"}
          </button>
          <button className="nav-btn" onClick={() => navigate("/login")}>Log in</button>
          <button className="nav-btn signup" onClick={() => navigate("/register")}>Sign up</button>
        </div>
      </nav>

      <div className="content">
        <div className="background-text">
          <h1>{t.heading}</h1>
          <p>{t.subtext}</p>
          <p className="platform">{t.platform}</p>
        </div>

        <div className="form-container">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>{t.welcome}</h2>
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
            <select disabled>
              <option>User</option>
              <option>Admin</option>
            </select>
            <button type="submit">{t.loginBtn}</button>
            {}
            <p>
              {t.registerPrompt} <a href="/register">{t.registerLink}</a>
            </p>
          </form>
        </div>
      </div>

      <div className="animated-lines"></div>
    </div>
  );
}
