import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UploadForm.css";
import { useNavigate } from "react-router-dom";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("2d");
  const [status, setStatus] = useState("");
  const [headers, setHeaders] = useState([]);
  const [cleanedData, setCleanedData] = useState([]);

  const navigate = useNavigate();

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
      ctx.font = `${fontSize}px monospace`;

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

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const rawData = res.data.data;
      const cleaned = rawData.map((row) => {
        const cleanedRow = {};
        for (let key in row) cleanedRow[key.trim()] = row[key];
        return cleanedRow;
      });

      setCleanedData(cleaned);
      setHeaders(Object.keys(cleaned[0] || []));
      setStatus("✅ File uploaded. Now choose X & Y axes.");
    } catch (err) {
      if (err.response?.status === 400) {
        // Reset state if file already exists
        setStatus("📂 File already exists. Redirecting to dashboard...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFile(null);
        navigate("/dashboard");
        return;
      }
      console.error("Upload Error:", err.response?.data || err.message);
      setStatus("❌ Upload failed. Please try again.");

      setCleanedData([]);
      setHeaders([]);
      setXAxis("");
      setYAxis("");
      setChartType("2d");
      setFile(null);
    }
  };

  const handleAnalyze = () => {
    if (!xAxis || !yAxis || cleanedData.length === 0) {
      setStatus("⚠️ Please select both axes.");
      return;
    }

    const payload = {
      data: cleanedData,
      xKey: xAxis,
      yKey: yAxis,
      chartType: chartType,
    };

    localStorage.setItem("chartData", JSON.stringify(payload));
    setStatus("✅ Ready! Redirecting to analysis...");
    setTimeout(() => {
      window.location.href = "/analyze";
    }, 800);
  };

  return (
    <div className="uploadform-container">
      <canvas id="matrix-canvas" className="matrix-background"></canvas>

      <div className="form-content">
        <div className="upload-card user-history">
          <h2>📂 Upload Excel File</h2>

          <form className="upload-form" onSubmit={handleUpload}>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
            <button type="submit">Upload File</button>
          </form>

          {headers.length > 0 && (
            <>
              <h3>🧠 Select Chart Axes</h3>
              <select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
                <option value="">Select X-Axis</option>
                {headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>

              <select value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
                <option value="">Select Y-Axis</option>
                {headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>

              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
              >
                <option value="2d">2D Chart</option>
                <option value="3d">3D Chart</option>
              </select>

              <button onClick={handleAnalyze}>Analyze Data</button>
            </>
          )}

          {status && <p className="upload-status">{status}</p>}
        </div>
      </div>
    </div>
  );
}
