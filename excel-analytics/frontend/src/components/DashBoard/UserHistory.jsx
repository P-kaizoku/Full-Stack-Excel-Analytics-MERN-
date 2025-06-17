import { useEffect, useState } from "react";
import axios from "axios";
import "./UserHistory.css";

export default function UserHistory() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/upload/history", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUploads(res.data))
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  return (
    <div className="user-history">
      <h2>📁 Your Upload History</h2>
      <ul>
        {uploads.length === 0 && <p>No uploads yet.</p>}
        {uploads.map((u) => (
          <li key={u._id}>
            <strong>{u.fileName}</strong> — <em>{u.chartType}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
