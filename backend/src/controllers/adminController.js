// Handles admin dashboard requests.

const {
  getDashboardStats, createUserByAdmin
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

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      role,
    } = req.body;

    const user =
      await createUserByAdmin(
        name,
        email,
        password,
        address,
        role
      );

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

module.exports = {
  dashboard,
  createUser
};