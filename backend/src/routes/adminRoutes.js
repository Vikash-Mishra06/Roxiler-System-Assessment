const express = require("express");
const {
  dashboard,
  createUser,
  addStore,
  getUsersList,
} = require("../controllers/adminController");
const authenticateUser = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/dashboard", authenticateUser, authorizeRoles("ADMIN"), dashboard);

router.post("/users", authenticateUser, authorizeRoles("ADMIN"), createUser);

router.post("/stores", authenticateUser, authorizeRoles("ADMIN"), addStore);

router.get("/users", authenticateUser, authorizeRoles("ADMIN"), getUsersList);

module.exports = router;
