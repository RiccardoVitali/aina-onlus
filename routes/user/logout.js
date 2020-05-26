const { SESS_NAME } = require("../../configs/config");

module.exports = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      res.sendStatus(500);
      console.error(err);
    }

    res.clearCookie(SESS_NAME);
    res.status(200).json("Successfull logout");
  });
};
