const pool = require("./connectionPool");

// return a user by user_id
const findUserById = async (id) => {
  const [rows] = await pool.query(
    `SELECT user_id, username, registered_at 
    FROM users
    WHERE user_id = ?`,
    [id]
  );
  return rows[0];
};

// create a user
const createUser = async (username, password_hash) => {
  const [insertInfo] = await pool.query(
    `INSERT INTO users (username, password_hash)
    VALUE (?, ?);`,
    [username, password_hash]
  );
  return insertInfo.insertId;
};

// find user by username
const findUserByUsername = async (username) => {
  const [rows] = await pool.query(
    `SELECT *
    FROM users
    WHERE username = ?`,
    [username]
  );
  return rows[0];
};

module.exports = { findUserById, createUser, findUserByUsername };
