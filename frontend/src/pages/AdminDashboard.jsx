import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/admin/dashboard");
      setStats(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const { logout } = useAuth();

  if (loading) {
    return (
      <div className="db-loading-wrapper">
        <p className="db-spinner-text">Loading platform insights...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <header className="db-header-navbar">
        <div className="db-brand-area">
          <h1>Console Hub</h1>
        </div>
        <nav className="db-nav-actions">
          <Link to="/admin/users" className="db-nav-link">
            Manage Users
          </Link>
          <Link to="/admin/stores" className="db-nav-link">
            Manage Stores
          </Link>
          <button onClick={handleLogout} className="db-logout-btn">
            Sign out
          </button>
          <Link to="/change-password" className="db-nav-link">
            Change Password
          </Link>
        </nav>
      </header>

      <main className="db-main-content">
        <div className="db-welcome-section">
          <h2>Admin Dashboard</h2>
          <p>System monitoring and organizational overview metric logs.</p>
        </div>

        <div className="db-metrics-grid">

          <div className="metric-card">
            <p className="metric-label">Total Users</p>
            <div className="metric-value">{stats?.totalUsers ?? 0}</div>
          </div>

          <div className="metric-card">
            <p className="metric-label">Total Stores</p>
            <div className="metric-value">{stats?.totalStores ?? 0}</div>
          </div>

          <div className="metric-card">
            <p className="metric-label">Total Ratings</p>
            <div className="metric-value">{stats?.totalRatings ?? 0}</div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;