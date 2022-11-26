const mysql = require("mysql2");
const config = require("../config");

const pool = mysql
  .createPool({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
  })
  .promise();

module.exports = pool;
