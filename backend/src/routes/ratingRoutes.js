const express = require("express");

const { submitRating, modifyRating } = require("../controllers/ratingController");

const authenticateUser = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/:storeId", authenticateUser, authorizeRoles("USER"), submitRating);

router.put("/:storeId", authenticateUser, authorizeRoles("USER"), modifyRating);

module.exports = router;
