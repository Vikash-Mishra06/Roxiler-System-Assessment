const express = require("express");
const { dashboard, createUser, addStore } = require("../controllers/adminController");
const authenticateUser = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/dashboard", authenticateUser, authorizeRoles("ADMIN"), dashboard);

router.post("/users", authenticateUser, authorizeRoles("ADMIN"), createUser);

router.post("/stores", authenticateUser, authorizeRoles("ADMIN"), addStore);

module.exports = router;
