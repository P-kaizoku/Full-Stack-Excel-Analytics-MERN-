import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminStats.css";

export default function AdminStats() {
  const [stats, setStats] = useState({ totalUploads: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/upload/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className="admin-stats">
      <h2>📊 Admin Stats</h2>
      <p>Total Uploads: <span>{stats.totalUploads}</span></p>
    </div>
  );
}
