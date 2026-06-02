import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./OwnerDashboard.css";

const StoreOwnerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/store-owner/dashboard");
      setDashboard(response.data.data);
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
      <div className="owner-loading">
        <p>Loading storefront metrics...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <header className="owner-navbar">
        <h1>Merchant Terminal</h1>
        <div className="owner-actions">
          <button onClick={handleLogout} className="owner-logout-btn">
            Sign out
          </button>
          <Link to="/change-password" className="owner-change-pwd-link">
            Change Password
          </Link>
        </div>
      </header>

      <main className="owner-layout">
        <div className="owner-intro">
          <h2>Store Performance</h2>
          <p>Real-time telemetry and user-submitted rating feedback audits.</p>
        </div>

        <div className="owner-summary-grid">

          <div className="owner-metric-card">
            <div className="owner-metric-label">Store Name</div>
            <div className="owner-metric-value">
              {dashboard?.store?.store_name || "Unregistered Store"}
            </div>
          </div>

          <div className="owner-metric-card">
            <div className="owner-metric-label">Average Rating</div>
            <div className="owner-metric-value score">
              ★ {dashboard?.store?.average_rating ? Number(dashboard.store.average_rating).toFixed(1) : "0.0"}
            </div>
          </div>

        </div>

        <h3 className="owner-section-title">Users Who Rated</h3>

        {dashboard?.ratedUsers?.length === 0 ? (
          <div className="owner-empty-state">
            <p>No consumer rating entries have been registered to this storefront unit yet.</p>
          </div>
        ) : (
          <div className="owner-table-shell">
            <table className="owner-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Score Contributed</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.ratedUsers?.map((user, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: "500" }}>{user.name}</td>
                    <td style={{ color: "#64748b" }}>{user.email}</td>
                    <td>
                      <span className="score-pill">
                        {user.rating} / 5
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default StoreOwnerDashboard;