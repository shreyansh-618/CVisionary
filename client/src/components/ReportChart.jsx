import React from "react";
import { Line } from "react-chartjs-2";
import { animate, motion } from "framer-motion";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./ReportsChart.css";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReportsChart = ({ data }) => {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Application Sent",
        data: data?.applications || [2, 5, 3, 8, 4, 6, 7],
        borderColor: "#667eea",
        backgroundColor: "rgba(102, 126, 234, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Profile Views",
        data: data?.profileViews || [12, 19, 15, 25, 18, 22, 20],
        borderColor: "#764ba2",
        backgroundColor: "rgba(118, 75, 162, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      Legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#f1f3f4",
        },
      },
      x: {
        grid: {
          color: "#f1f3f4",
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
  };

  return (
    <motion.div
      className="reports-chart"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h3>Weekly Activity</h3>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default ReportsChart;
