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

module.exports = { findCommentsByPostId };
