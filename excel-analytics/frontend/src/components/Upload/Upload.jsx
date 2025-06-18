import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UploadForm from "./UploadForm";
import AdminStats from "../DashBoard/AdminStats";
import UserHistory from "../DashBoard/UserHistory";
import "./Upload.css";

export default function Upload() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/upload", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">📊 SheetSense</div>
        <ul className="sidebar-menu">
          <li className="active">Dashboard</li>
          <li>Upload Excel</li>
          <li>Analyze Data</li>
          <li>History</li>
          <li>AI Insights</li>
          <li>Chat With File</li>
          <li>Settings</li>
        </ul>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div></div>
          <div className="user-section">
            <span>{user.name}</span>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </header>

        <section className="welcome-container">
          <div className="welcome-card">
            <h2>Welcome {user.name}!</h2>
            <p>
              You have successfully logged in. Your analytics and uploads will
              appear here.
            </p>
          </div>
        </section>

        <section className="data-sections">
          <UploadForm />
          <AdminStats />
          <UserHistory />
        </section>
      </div>
    </div>
  );
}
