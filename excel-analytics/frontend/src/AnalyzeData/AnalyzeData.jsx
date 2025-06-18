import React, { useEffect, useState } from "react";
import Chart2D from "../components/Charts/Chart2D";
import "./AnalyzeData.css"; // Assuming you have some styles for this component

export default function AnalyzeData() {
  const [data, setData] = useState([]);
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("chartData");
      if (!raw) return;

      const { data, xKey, yKey } = JSON.parse(raw);

      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]);
        setHeaders(keys);
        setData(data);

        // Use localStorage keys or default to first header
        setXKey(xKey && keys.includes(xKey) ? xKey : keys[0]);
        setYKey(yKey && keys.includes(yKey) ? yKey : keys[1] || keys[0]);
      } else {
        console.warn("❌ Invalid chart data", { data });
      }
    } catch (err) {
      console.error("🔥 Failed to parse chartData", err);
    }
  }, []);

  const handleKeyChange = (type, value) => {
    if (type === "x") setXKey(value);
    if (type === "y") setYKey(value);
  };

  return (
    <div className="analyze-container">
      <h1>📊 Analyze Data</h1>

      {data.length > 0 ? (
        <>
          <div className="axis-selectors">
            <div>
              <label>X-Axis:</label>
              <select
                value={xKey}
                onChange={(e) => handleKeyChange("x", e.target.value)}
              >
                {headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Y-Axis:</label>
              <select
                value={yKey}
                onChange={(e) => handleKeyChange("y", e.target.value)}
              >
                {headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="chart-wrapper">
            <Chart2D data={data} xKey={xKey} yKey={yKey} />
          </div>
        </>
      ) : (
        <p>📥 Upload data first or select dataset to analyze.</p>
      )}
    </div>
  );
}
