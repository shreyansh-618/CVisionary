import React from "react";
import { motion } from "framer-motion";
import "./WeeklyAnalytics.css";

const WeeklyAnalytics = ({ data }) => {
  const mockData = data || {
    weeklyProgress: 75,
    improvements: [
      "Resume updated with latest project",
      "Portfolio enhanced with 3 new images",
      "Cover letter template optimized",
    ],
    nextGoals: [
      "Apply to 5 more positions",
      "Update LinkedIn profile",
      "Complete skill assessment",
    ],
  };

  return (
    <motion.div
      className="weekly-analytics"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3>This Week's Progress</h3>

      <div className="progress-section">
        <div className="progress-header">
          <span>Overall Progress</span>
          <span className="progress-percentage">
            {mockData.weeklyProgress}%
          </span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${mockData.weeklyProgress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-section">
          <h4>✅ Completed</h4>
          <ul>
            {mockData.improvements.map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="analytics-section">
          <h4>🎯 Next Goals</h4>
          <ul>
            {mockData.nextGoals.map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyAnalytics;
