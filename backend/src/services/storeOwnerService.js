// Store owner related database operations.

const pool = require("../config/db");

const getStoreOwnerDashboard = async (ownerId) => {
  const result = await pool.query(
    `
    SELECT
      s.id AS store_id,
      s.name AS store_name,
      COALESCE(
        ROUND(AVG(r.rating), 1),
        0
      ) AS average_rating
    FROM stores s
    LEFT JOIN ratings r
      ON s.id = r.store_id
    WHERE s.owner_id = $1
    GROUP BY s.id
    `,
    [ownerId],
  );

  return result.rows[0];
};

const getRatedUsers = async (ownerId) => {
  const result = await pool.query(
    `
    SELECT
      u.name,
      u.email,
      r.rating
    FROM stores s
    JOIN ratings r
      ON s.id = r.store_id
    JOIN users u
      ON u.id = r.user_id
    WHERE s.owner_id = $1
    ORDER BY u.name
    `,
    [ownerId],
  );

  return result.rows;
};

module.exports = {
  getStoreOwnerDashboard,
  getRatedUsers,
};
