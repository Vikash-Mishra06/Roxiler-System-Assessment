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

const createUserByAdmin = async (name, email, password, address, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users
    (name, email, password, address, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, role
    `,
    [name, email, hashedPassword, address, role],
  );

  return result.rows[0];
};

const createStore = async (
  name,
  email,
  address,
  ownerId
) => {
  const result = await pool.query(
    `
    INSERT INTO stores
    (name, email, address, owner_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [name, email, address, ownerId]
  );

  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

const findStoreByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM stores WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

const findStoreByOwnerId = async (ownerId) => {
  const result = await pool.query(
    "SELECT * FROM stores WHERE owner_id = $1",
    [ownerId]
  );

  return result.rows[0];
};

const getUsers = async (
  search = "",
  role = "",
  sortBy = "name",
  order = "ASC"
) => {
  const allowedSortFields = [
    "name",
    "email",
    "role",
  ];

  const safeSortField =
    allowedSortFields.includes(sortBy)
      ? sortBy
      : "name";

  const safeOrder =
    order.toUpperCase() === "DESC"
      ? "DESC"
      : "ASC";

  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      address,
      role
    FROM users
    WHERE
      (
        name ILIKE $1
        OR email ILIKE $1
        OR address ILIKE $1
      )
      AND (
        $2 = ''
        OR role = $2
      )
    ORDER BY ${safeSortField} ${safeOrder}
    `,
    [`%${search}%`, role]
  );

  return result.rows;
};

module.exports = {
  getDashboardStats,
  createUserByAdmin,
  createStore,
  findUserById,
  findStoreByEmail,
  getUsers,
};