// Rating related database operations.

const pool = require("../config/db");

const findRating = async (
  userId,
  storeId
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM ratings
    WHERE user_id = $1
    AND store_id = $2
    `,
    [userId, storeId]
  );

  return result.rows[0];
};

const createRating = async (
  userId,
  storeId,
  rating
) => {
  const result = await pool.query(
    `
    INSERT INTO ratings
    (user_id, store_id, rating)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [userId, storeId, rating]
  );

  return result.rows[0];
};

const updateRating = async (
  userId,
  storeId,
  rating
) => {
  const result = await pool.query(
    `
    UPDATE ratings
    SET rating = $1
    WHERE user_id = $2
    AND store_id = $3
    RETURNING *
    `,
    [rating, userId, storeId]
  );

  return result.rows[0];
};

module.exports = {
  findRating,
  createRating,
  updateRating,
};