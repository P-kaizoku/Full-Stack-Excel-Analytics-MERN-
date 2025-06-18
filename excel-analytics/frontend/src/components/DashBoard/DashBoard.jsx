import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "./Dashboard.css";
import Chart2D from "../Charts/Chart2D";
import Chart3D from "../Charts/Chart3D";
import { logout } from "../../services/auth";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");
  const [user, setUser] = useState(null);

  const [showCharts, setShowCharts] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("matrix-canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = "📊📈";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff00";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    const interval = setInterval(drawMatrix, 50);
    return () => clearInterval(interval);
  }, []);

  const handleUploadRedirect = () => {
    navigate("/upload");
  };

  return (
    <div className="dashboard-container">
      <canvas id="matrix-canvas" className="matrix-background"></canvas>

      <aside className="sidebar">
        <div className="logo">Visualxcel</div>
        <nav>
          <ul>
            <li>🖥️ Dashboard</li>
            <li onClick={handleUploadRedirect}>📥 Upload Excel</li>
            <li onClick={() => navigate("/analyze")}>📊 Analyze Data</li>
            <li>🕒 History</li>
            <li>🤖 Ai Insights</li>
            <li>💬 Chat with file</li>
            <li>⚙️ Settings</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <div className="top-bar">
          <h1>Dashboard</h1>
          <div className="top-bar-right">
            <div className="profile">👤 {user?.name || "User"}</div>
            <button
              className="logout-btn"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="welcome-section">
          <h2 className="animated-heading-sky">Visualize your Data with us</h2>
          <p className="animated-subtext-sky">
            Upload, visualize, and transform your spreadsheets into interactive
            charts and reports with just a few clicks.
          </p>
          <p className="animated-subtext-sky">
            Welcome to your own platform — <strong>Visualxcel</strong>
          </p>
        </div>

        <div className="card-grid square-grid compact">
          <div className="feature-card" onClick={handleUploadRedirect}>
            📥 Upload Excel
          </div>
          <div className="feature-card">🖥️ Dashboard</div>
          <div onClick={() => navigate("/analyze")} className="feature-card">
            📊 Analyze Data
          </div>
          <div className="feature-card">🕒 History</div>
          <div className="feature-card">🤖 Ai Insights</div>
          <div className="feature-card">💬 Chat with file</div>
          <div className="feature-card">⚙️ Settings</div>
        </div>
      </main>
    </div>
  );
}
