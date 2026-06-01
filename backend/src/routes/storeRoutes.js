const express = require("express");

const { getStores } = require("../controllers/storeController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateUser, getStores);

module.exports = router;