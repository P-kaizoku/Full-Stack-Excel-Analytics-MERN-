import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Assuming you have a CSS file for styling
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-left">📈Visualxcel</div>
      <div className="navbar-right">
        {/* <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light" : "Dark"}
          </button> */}
        <button className="nav-btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button
          className="nav-btn signup"
          onClick={() => navigate("/register")}
        >
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
