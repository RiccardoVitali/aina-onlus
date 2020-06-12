"use strict";

const connectionPool = require("./database");

exports.getUser = async username => {
  const result = await connectionPool.query(
    "SELECT * FROM Users WHERE user_name = $1  LIMIT 1",
    [username]
  );
  return result.rows;
};

exports.insertUser = async (username, password) => {

  return await connectionPool.query(
    "INSERT INTO Users (user_name, user_password) VALUES ($1,$2)",
    [username, password]
  );
};
