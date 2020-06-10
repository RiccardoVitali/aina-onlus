
'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserServiceSwagger');
const { SESS_NAME } = require("../configs/config");


module.exports.usersLoginPOST = function usersLoginPOST (req, res, next) {
  var username = req.swagger.params["username"].value;
  var password = req.swagger.params["password"].value;
  User.usersLoginPOST(username, password)
    .then(function (response) {

      if(response.username==undefined){
        req.session.uid = false;

        res.status(303).location('/login.html');
        res.end();
      }

      else{
      req.session.uid = response.username;
      res.writeHead(301, { Location: "/dash.html" });
      res.end();
    }

    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersMeGET = function usersMeGET (req, res, next) {

  if(req.session.uid==false){
    utils.writeJson(res, { error: "invalid credentials"}, 303);
  }
  else{
  User.usersMeGET(req.session.uid)
    .then(function (response) {

      if(response!=false){
        utils.writeJson(res, response);
      }
      else{
        utils.writeJson(res, { error: "Sorry, invalid credentials"}, 303);
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
  }
};

module.exports.usersLogout = function usersLogout (req, res, next) {

  req.session = null;
  res.clearCookie(SESS_NAME);
  res.writeHead(301, { Location: "/index.html" });
  res.end();

};
