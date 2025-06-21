// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerUser } from "../../services/auth";
import "./Register.css";
import Navbar from "../Navbar.jsx";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   document.body.className = darkMode ? "dark-mode" : "light-mode";
  // }, [darkMode]);

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
      setError(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="content">
        <div className="form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <button className="register-btn" type="submit">
              Register
            </button>
            {success && (
              <div className="success-alert">User registered successfully!</div>
            )}
            {error && <div className="error-alert">{error}</div>}
            <p className="switch-auth">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
