// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerUser } from "../../services/auth";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "User" });
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await registerUser(form);
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const translations = {
    en: {
      heading: "Visualize your Data with us",
      subheading: "Upload, visualize, and transform your spreadsheets into interactive charts and reports with just a few clicks.",
      platform: "Welcome to your own platform — Visualxcel",
      formTitle: "Create Account",
      name: "Name",
      email: "Email",
      password: "Password",
      role: "Select Role",
      button: "Register",
      loginPrompt: "Already have an account?",
      loginLink: "Login",
      successMessage: "User registered successfully!",
    },
  };

  const t = translations[language];

  return (
    <div className="login-page">
      <nav className="navbar">
        <div className="navbar-left">🟩📊 Excel Analytics Platform</div>
        <div className="navbar-right">
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
          </select>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light" : "Dark"}
          </button>
          <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="nav-btn signup" onClick={() => navigate("/register")}>Sign up</button>
        </div>
      </nav>

      <div className="content">
        <div className="background-text">
          <h1>{t.heading}</h1>
          <p>{t.subheading}</p>
          <p className="platform">{t.platform}</p>
        </div>

        <div className="form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>{t.formTitle}</h2>
            <input
              placeholder={t.name}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              placeholder={t.email}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              placeholder={t.password}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <button type="submit">{t.button}</button>
            {success && <div className="success-alert">{t.successMessage}</div>}
            {error && <div className="error-alert">{error}</div>}
            <p>{t.loginPrompt} <a href="/login">{t.loginLink}</a></p>
          </form>
        </div>
      </div>

      <div className={`animated-lines ${darkMode ? "green" : "blue"}`}></div>
    </div>
  );
}
