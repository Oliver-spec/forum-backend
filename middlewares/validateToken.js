const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

const validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send("No authorization header");

    const token = authHeader.slice(7);
    const { user_id } = jwt.verify(token, SECRET);
    req.user_id = user_id;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = validateToken;
