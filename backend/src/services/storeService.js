// Store related database operations.

const pool = require("../config/db");

const getAllStores = async () => {
  const result = await pool.query(`
    SELECT
      s.id,
      s.name,
      s.address,
      COALESCE(
        ROUND(AVG(r.rating), 1),
        0
      ) AS overall_rating
    FROM stores s
    LEFT JOIN ratings r
      ON s.id = r.store_id
    GROUP BY s.id
    ORDER BY s.id;
  `);

  return result.rows;
};

module.exports = {
  getAllStores,
};