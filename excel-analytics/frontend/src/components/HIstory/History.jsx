import React from "react";
import "./History.css";

const History = () => {
  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/history");
      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  return (
    <div>
      <h2 className="Heading">History</h2>
      <div className="history-container"></div>
    </div>
  );
};

export default History;
