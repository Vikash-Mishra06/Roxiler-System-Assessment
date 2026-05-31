// Store related database operations.

const pool = require("../config/db");

const getAllStores = async (search = "") => {
  const result = await pool.query(
    `
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
    WHERE
      s.name ILIKE $1
      OR s.address ILIKE $1
    GROUP BY s.id
    ORDER BY s.id
    `,
    [`%${search}%`],
  );

  return result.rows;
};

module.exports = {
  getAllStores,
};
