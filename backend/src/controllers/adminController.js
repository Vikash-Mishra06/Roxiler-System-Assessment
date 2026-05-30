// Handles admin dashboard requests.

const {
  getDashboardStats,
} = require("../services/adminService");

const dashboard = async (req, res) => {
  try {
    const stats =
      await getDashboardStats();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

module.exports = {
  dashboard,
};