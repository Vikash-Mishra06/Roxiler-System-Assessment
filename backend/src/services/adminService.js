// Admin related database operations. Dashboard statistics are fetched here.

const pool = require("../config/db");

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

module.exports = {
  getDashboardStats,
};
