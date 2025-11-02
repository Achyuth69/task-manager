import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        padding: "10px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3 style={{ color: "#007bff", margin: 0 }}>Task Manager</h3>
      <Link
        to="/"
        style={{
          color: "#007bff",
          textDecoration: "none",
          fontWeight: "500",
        }}
      >
        Home
      </Link>
    </nav>
  );
}
