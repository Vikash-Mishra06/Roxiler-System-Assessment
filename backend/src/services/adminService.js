// Admin related database operations. Dashboard statistics are fetched here.

const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const getDashboardStats = async () => {
  const [users, stores, ratings] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM users"),
    pool.query("SELECT COUNT(*) FROM stores"),
    pool.query("SELECT COUNT(*) FROM ratings"),
  ]);

  return {
    totalUsers: Number(users.rows[0].count),
    totalStores: Number(stores.rows[0].count),
    totalRatings: Number(ratings.rows[0].count),
  };
};

const createUserByAdmin = async (
  name,
  email,
  password,
  address,
  role
) => {
  const hashedPassword =
    await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users
    (name, email, password, address, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, role
    `,
    [
      name,
      email,
      hashedPassword,
      address,
      role,
    ]
  );

  return result.rows[0];
};

module.exports = {
  getDashboardStats,
  createUserByAdmin,
};
