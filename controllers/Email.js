'use strict';

var utils = require('../utils/writer.js');
var Email = require('../service/EmailService');

module.exports.emailPOST = function emailPOST (req, res, next) {
  var email = req.swagger.params['email'].value;
  Email.emailPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
