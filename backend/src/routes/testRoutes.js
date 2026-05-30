const express = require("express");
const authenticateUser = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/admin", authenticateUser, authorizeRoles("ADMIN"), (req, res) => {
  res.json({
    success: true,
    message: "Admin route accessed",
  });
});

module.exports = router;
