
'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserServiceSwagger');
const { SESS_NAME } = require("../configs/config");


module.exports.usersLoginPOST = function usersLoginPOST (req, res, next) {
  var username = req.swagger.params["username"].value;
  //var email = req.swagger.params['email'].value;
  var password = req.swagger.params["password"].value;
  User.usersLoginPOST(username, password)
    .then(function (response) {
      console.log("response.name")
      console.log(response);
      console.log("req.session.uid");

      console.log(req.session.uid);

      if(response.username==undefined){
        req.session.uid = false;

        res.status(303).location('/login.html');
        res.end();
      }
      /*if(response==409){
        //res.writeHead(301, { Location: "/login.html" });
        res.status(303).location('/login.html');
        res.end();
      }
      if(response==false){
        //res.writeHead(301, { Location: "/login.html" });
        //res.status(302).location('/login.html');
        res.sendStatus(302);
        res.end();
      }
      else{*/
      else{
      req.session.uid = response.username;
      res.writeHead(301, { Location: "/dash.html" });
      res.end();
    }
      //utils.writeJson(res, response);
    //}
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersMeGET = function usersMeGET (req, res, next) {
  console.log("req.status");

  console.log(req.session.uid);
  if(req.session.uid==false){
    utils.writeJson(res, { error: "invalid credentials"}, 303);
  }
  else{
  console.log("USERGETreq.session.uid");
  console.log(req.session.uid);
  User.usersMeGET(req.session.uid)
    .then(function (response) {
      console.log("kkkkkk");
      console.log(response);

      if(response!=false){
        utils.writeJson(res, response);
      }
      else{
        utils.writeJson(res, { error: "Sorry, invalid credentials"}, 401);
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
  console.log("req.session");
  console.log(req.session);
  res.writeHead(301, { Location: "/login.html" });
  res.end();

};
