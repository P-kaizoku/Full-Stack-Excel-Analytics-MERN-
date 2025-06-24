import React from "react";
import { FaRobot, FaChartBar, FaBolt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 700, marginBottom: 16 }}>
          <span style={{ color: "#00e6a7" }}>Excel</span> Analytics{" "}
          <FaRobot style={{ verticalAlign: "middle" }} />
        </div>
        <h2
          style={{
            fontWeight: 400,
            fontSize: 28,
            marginBottom: 32,
            color: "#b0eaff",
          }}
        >
          Unlock powerful{" "}
          <span style={{ color: "#00e6a7" }}>AI-driven insights</span> from your
          spreadsheets.
        </h2>
        <p style={{ fontSize: 18, color: "#e0e0e0", marginBottom: 40 }}>
          Transform your Excel data into actionable intelligence. Our AI
          analyzes your spreadsheets to deliver clear, concise, and impactful
          insights—so you can make smarter decisions, faster.
        </p>
        <a
          onClick={() => navigate("/register")}
          style={{
            background: "linear-gradient(90deg, #00e6a7 0%, #00b3ff 100%)",
            color: "#fff",
            padding: "16px 40px",
            borderRadius: 32,
            fontSize: 20,
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 4px 24px rgba(0,230,167,0.2)",
            transition: "background 0.3s",
          }}
        >
          Get Started
        </a>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
            marginTop: 56,
            flexWrap: "wrap",
          }}
        >
          <Feature
            icon={<FaChartBar size={32} color="#00e6a7" />}
            title="Instant Analysis"
            desc="Upload your Excel files and get insights in seconds."
          />
          <Feature
            icon={<FaBolt size={32} color="#00e6a7" />}
            title="AI-Powered"
            desc="Advanced AI uncovers trends, anomalies, and opportunities."
          />
          <Feature
            icon={<FaRobot size={32} color="#00e6a7" />}
            title="Actionable Reports"
            desc="Receive clear, actionable recommendations tailored to your data."
          />
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.05)",
      borderRadius: 16,
      padding: "24px 32px",
      minWidth: 220,
      maxWidth: 260,
      textAlign: "center",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    }}
  >
    <div style={{ marginBottom: 12 }}>{icon}</div>
    <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
      {title}
    </div>
    <div style={{ color: "#b0eaff", fontSize: 15 }}>{desc}</div>
  </div>
);

export default Hero;
