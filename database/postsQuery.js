const pool = require("./connectionPool");

// return a post by id
const findPostById = async (id) => {
  const [rows] = await pool.query(
    `SELECT
    p.post_id,
    p.user_id,
    p.title,
    p.created_at,
    p.body,
    p.rating,
    p.last_modified,
    u.username

    FROM posts p
    
    JOIN users u
    
    USING (user_id)

    WHERE post_id = ?`,
    [id]
  );
  return rows[0];
};

// return all posts
const findAllPosts = async () => {
  const [rows] = await pool.query(
    `SELECT
    p.post_id,
    p.user_id,
    p.title,
    p.created_at,
    p.body,
    p.rating,
    p.last_modified,
    u.username
    
    FROM posts p
    
    JOIN users u
    
    USING (user_id)
    
    ORDER BY last_modified desc
    
    LIMIT 50;`
  );
  return rows;
};

// create post
const createPost = async (user_id, title, body) => {
  const [insertInfo] = await pool.query(
    `INSERT INTO posts (user_id, title, body)

    VALUE (?, ?, ?);`,
    [user_id, title, body]
  );
  return insertInfo.insertId;
};

module.exports = { findPostById, findAllPosts, createPost };
