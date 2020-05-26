"use strict";

const dataUser = require("../../controllers/user");
const bcrypt = require("bcrypt");

module.exports = (req, res, next) => {
  console.log("req.body");
  console.log(req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(422).json("Request body is not complete");
    return;
  }

  dataUser
    .getUser(username)
    .then(rows => {
      if (rows.length == 0) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        return dataUser.insertUser(username, hashedPassword);
      }

      return Promise.reject({
        msg: "Username Is Already Taken",
        statusCode: 409
      });
    })
    .then(() => {
      req.session.username = username;
      req.session.isLoggedIn = true;
      res.status(200).json({ username: req.session.username });
    })
    .catch(error => {
      if (error.statusCode === 409) {
        res.status(409).json("Username is already taken");
      } else {
        res.sendStatus(500);
        throw error;
      }
    });
};
