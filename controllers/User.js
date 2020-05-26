"use strict";

const connectionPool = require("./database");

exports.getUser = async username => {
  console.log("getting user");
  const result = await connectionPool.query(
    "SELECT * FROM Users WHERE user_name = $1  LIMIT 1",
    [username]
  );
  console.log("result");
  console.log(result.rows);
  return result.rows;
};

exports.insertUser = async (username, password) => {
  console.log("inserting user");

  return await connectionPool.query(
    "INSERT INTO Users (user_name, user_password) VALUES ($1,$2)",
    [username, password]
  );
};
