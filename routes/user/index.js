const user = require("express").Router();
const login = require("./login");
const signup = require("./signup");
const logout = require("./logout");

user.post("/login", login);
user.post("/signup", signup);
user.post("/logout", logout);

module.exports = user;
