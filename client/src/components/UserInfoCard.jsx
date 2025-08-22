import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import "./UserInfoCard.css";

const UserInfoCard = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/api/user/profile");
      setUserProfile(response.data);
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="user-info-card">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="user-info-card"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="user-avatar">
        <img
          src={
            userProfile?.profileImage ||
            `https://ui-avatars.com/api/?name=${user?.email}&background=667eea&color=fff`
          }
          alt="Profile"
        />
      </div>

      <div className="user-info">
        <h3>{userProfile?.name || "User"}</h3>
        <p>{user?.email}</p>
        <div className="user-stats">
          <div className="stat">
            <span className="stat-number">
              {userProfile?.totalResumes || 0}
            </span>
            <span className="stat-label">Resumes</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {userProfile?.totalApplications || 0}
            </span>
            <span className="stat-label">Applications</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserInfoCard;
