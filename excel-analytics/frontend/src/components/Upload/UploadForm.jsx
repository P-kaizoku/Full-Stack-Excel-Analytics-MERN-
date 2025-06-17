import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UploadForm.css";

export default function UploadForm({ onDataLoaded }) {
  const [file, setFile] = useState(null);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("2d");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const canvas = document.getElementById("matrix-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = "📊📈";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00";
      ctx.font = `${fontSize}px monospace`; // ✅ Fixed interpolation

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(drawMatrix, 50);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("xAxis", xAxis);
    formData.append("yAxis", yAxis);
    formData.append("chartType", chartType);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Fixed
          "Content-Type": "multipart/form-data",
        },
      });

      onDataLoaded?.(res.data.data, xAxis, yAxis, chartType); // ✅ Adjusted
      setStatus("✅ Upload successful!");
    } catch (err) {
      console.error("Upload Error:", err.response?.data || err.message);
      setStatus("❌ Upload failed. Please try again.");
    }
  };

  return (
    <div className="uploadform-container">
      <canvas id="matrix-canvas" className="matrix-background"></canvas>

      <div className="form-content">
        <div className="upload-description floating-text">
          Upload, visualize, and transform your spreadsheets into interactive charts and reports with just a few clicks.
        </div>

        <div className="upload-card user-history">
          <h2>📂 Upload Excel File</h2>
          <form className="upload-form" onSubmit={handleSubmit}>
            <input type="file" accept=".xlsx, .xls" onChange={(e) => setFile(e.target.files[0])} required />
            <input
              type="text"
              placeholder="X-Axis Column"
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Y-Axis Column"
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
              required
            />
            <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <option value="2d">2D Chart</option>
              <option value="3d">3D Chart</option>
            </select>
            <button type="submit">Upload</button>
          </form>
          {status && <p className="upload-status">{status}</p>}
        </div>
      </div>
    </div>
  );
}
