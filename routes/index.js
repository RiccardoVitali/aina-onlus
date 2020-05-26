const routes = require("express").Router();
const path = require("path");
const user = require("./User");


routes.get("/isLoggedIn", (req, res) => {
  console.log(req.session);
  if (req.session.isLoggedIn) {
    res.send("You are logged in");
  } else {
    res.send("You are NOT logged in");
  }
});

routes.use("/user", user);
module.exports = routes;
