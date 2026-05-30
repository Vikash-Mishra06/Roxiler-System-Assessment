// Generates JWT token for authenticated users. We keep token creation in a separate utility so it can be reused anywhere in the application.

const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;