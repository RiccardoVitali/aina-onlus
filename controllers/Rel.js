'use strict';

var utils = require('../utils/writer.js');
var Rel = require('../service/RelService');

module.exports.relGET = function relGET (req, res, next) {
  Rel.relGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
