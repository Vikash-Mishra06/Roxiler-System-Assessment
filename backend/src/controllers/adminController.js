// Handles admin dashboard requests.

const {
  getDashboardStats,
  createUserByAdmin,
} = require("../services/adminService");
const { createStore, findUserById } = require("../services/adminService");

const dashboard = async (req, res) => {
  try {
    const stats = await getDashboardStats();

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
    const { name, email, password, address, role } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const user = await createUserByAdmin(name, email, password, address, role);

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

const addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const owner = await findUserById(ownerId);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Store owner not found",
      });
    }

    if (owner.role !== "STORE_OWNER") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not a store owner",
      });
    }

    const existingStore = await findStoreByEmail(email);

    if (existingStore) {
      return res.status(400).json({
        success: false,
        message: "Store email already exists",
      });
    }

    const assignedStore = await findStoreByOwnerId(ownerId);

    if (assignedStore) {
      return res.status(400).json({
        success: false,
        message: "Store owner already has a store",
      });
    }

    const store = await createStore(name, email, address, ownerId);

    return res.status(201).json({
      success: true,
      data: store,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create store",
    });
  }
};

module.exports = {
  dashboard,
  createUser,
  addStore,
};
