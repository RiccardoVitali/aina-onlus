const dataUser = require("../../controllers/User");
const bcrypt = require("bcrypt");

module.exports = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.status(200).json({ username: req.session.username });
    return;
  }

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(422).json("Request body is not complete");
    return;
  }

  dataUser
    .getUser(username)
    .then(rows => {
      if (rows.length > 0) {
        const hashedPassword = rows[0].user_password;
        if (bcrypt.compareSync(password, hashedPassword)) {
          req.session.username = username;
          req.session.isLoggedIn = true;
          console.log("res.header:", res.headers);
          res.status(200).json({ username: req.session.username });
          return;
        }
      }
      res.status(401).json("Invalid Credentials");
    })
    .catch(error => {
      res.sendStatus(500);
      console.error(error);
    });
};
