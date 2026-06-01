const express = require("express");

const { register, login, changePassword } = require("../controllers/authController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/change-password", authenticateUser, changePassword);

module.exports = router;