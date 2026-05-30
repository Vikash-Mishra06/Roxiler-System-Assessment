const express = require("express");

const {
  dashboard,
} = require("../controllers/adminController");

const authenticateUser = require(
  "../middleware/authMiddleware"
);

const authorizeRoles = require(
  "../middleware/roleMiddleware"
);

const router = express.Router();

router.get(
  "/dashboard",
  authenticateUser,
  authorizeRoles("ADMIN"),
  dashboard
);

module.exports = router;