const express = require("express");

const { dashboard } = require("../controllers/storeOwnerController");

const authenticateUser = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/dashboard", authenticateUser, authorizeRoles("STORE_OWNER"), dashboard );

module.exports = router;
