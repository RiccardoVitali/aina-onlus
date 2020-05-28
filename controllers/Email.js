'use strict';

var utils = require('../utils/writer.js');
var Email = require('../service/EmailService');

module.exports.emailGET = function emailGET (req, res, next) {
  Email.emailGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
