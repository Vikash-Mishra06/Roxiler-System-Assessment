// Authentication database operations.Controllers should focus on request handling,while services interact with the database.

const pool = require("../config/db");

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows[0];
};

const createUser = async (name, email, password, address) => {
  const result = await pool.query(
    `
      INSERT INTO users
      (name, email, password, address, role)
      VALUES ($1, $2, $3, $4, 'USER')
      RETURNING id, name, email, role
    `,
    [name, email, password, address],
  );

  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  createUser,
};
