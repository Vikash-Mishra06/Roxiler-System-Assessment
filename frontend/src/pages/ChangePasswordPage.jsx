import { useState } from "react";
import api from "../services/api";
import "./ChangePassword.css";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      alert("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to update password"
      );
    }
  };

  return (
    <div className="settings-page-container">
      <div className="settings-card">
        <div className="settings-header">
          <h1>Change Password</h1>
          <p className="settings-subtitle">Update your credentials to maintain account safety.</p>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="currentPassword">Current password</label>
            <input
              id="currentPassword"
              type="password"
              placeholder="••••••••"
              className="settings-input"
              value={currentPassword}
              required
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="newPassword">New password</label>
            <input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              className="settings-input"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm new password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="settings-input"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="settings-submit-btn">
            Update Password
          </button>
        </form>

      </div>
    </div>
  );
};

export default ChangePasswordPage;