const pool = require("./connectionPool");

// find commnents of a post
const findCommentsByPostId = async (post_id) => {
  const [rows] = await pool.query(
    `SELECT
    c.user_id,
    c.body,
    c.created_at,
    c.rating,
    u.username
    
    FROM comments c
    
    JOIN users u

    USING (user_id)
    
    WHERE post_id = ?
    
    ORDER BY created_at desc;`,
    [post_id]
  );
  return rows;
};

// create a comment
const makeComment = async (user_id, post_id, body) => {
  const [insertInfo] = await pool.query(
    `INSERT INTO comments (user_id, post_id, body)

    VALUE (?, ?, ?);`,
    [user_id, post_id, body]
  );

  const [updateInfo] = await pool.query(
    `UPDATE posts
    
    SET last_modified = CURRENT_TIMESTAMP()
    
    WHERE post_id = ?;`,
    [post_id]
  );

  return [insertInfo.insertId, updateInfo.info];
};

module.exports = { findCommentsByPostId, makeComment };
