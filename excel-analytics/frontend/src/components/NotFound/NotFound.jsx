import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1>🚫 404</h1>
      <p>Looks like you took a wrong turn in the matrix.</p>
      <Link to="/" className="home-link">
        ⏎ Return to safety
      </Link>
    </div>
  );
}
