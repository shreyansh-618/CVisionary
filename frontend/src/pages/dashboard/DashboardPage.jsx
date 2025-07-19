"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { dashboardAPI } from "../services/api";
import "./DashboardPage.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await dashboardAPI.getStats();
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Resume Views",
        data: stats?.weeklyViews || [12, 19, 3, 5, 2, 3, 9],
        borderColor: "var(--primary-color)",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const skillsData = {
    labels: ["Technical Skills", "Soft Skills", "Languages", "Certifications"],
    datasets: [
      {
        data: stats?.skillsBreakdown || [40, 30, 20, 10],
        backgroundColor: [
          "var(--primary-color)",
          "var(--accent-color)",
          "var(--success-color)",
          "var(--secondary-color)",
        ],
      },
    ],
  };

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">
          Welcome back! Here's your career overview.
        </p>
      </div>

      <div className="stats-grid">
        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="stat-icon">📄</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats?.totalResumes || 5}</h3>
            <p className="stat-label">Resumes Created</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats?.totalCoverLetters || 12}</h3>
            <p className="stat-label">Cover Letters</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats?.averageScore || 85}%</h3>
            <p className="stat-label">Avg Match Score</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="stat-icon">👁️</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats?.totalViews || 234}</h3>
            <p className="stat-label">Profile Views</p>
          </div>
        </motion.div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">Weekly Activity</h3>
          <Line data={weeklyData} options={{ responsive: true }} />
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Skills Breakdown</h3>
          <Doughnut data={skillsData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="recent-activity">
        <h3 className="section-title">Recent Activity</h3>
        <div className="activity-list">
          {(
            stats?.recentActivity || [
              { action: "Created new resume", time: "2 hours ago" },
              { action: "Generated cover letter", time: "1 day ago" },
              { action: "Analyzed job description", time: "2 days ago" },
            ]
          ).map((activity, index) => (
            <motion.div
              key={index}
              className="activity-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="activity-content">
                <p className="activity-action">{activity.action}</p>
                <p className="activity-time">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
