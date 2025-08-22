import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import "./Navigation.css";

const Navigation = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/resume-builder", label: "Resume Builder", icon: "📄" },
    { path: "/cover-letter", label: "Cover Letter", icon: "✉️" },
    { path: "/portfolio", label: "Portfolio", icon: "🖼️" },
    { path: "/job-analyzer", label: "Job Analyzer", icon: "🔍" },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>CVisionay</h2>
        </div>

        <div className="nav-items">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {location.pathname === item.path && (
                <motion.div
                  className="nav-indicator"
                  layoutId="indicator"
                  initial={false}
                />
              )}
            </Link>
          ))}
        </div>
        <button onClick={logout} className="nav-logout">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
