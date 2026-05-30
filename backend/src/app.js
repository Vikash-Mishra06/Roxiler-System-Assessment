// Main Express application setup. Middlewares and routes are registered here.

const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes')
const testRoutes = require("./routes/testRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});

module.exports = app;