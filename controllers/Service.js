'use strict';

var utils = require('../utils/writer.js');
var Service = require('../service/ServiceService');


module.exports.servicesServiceIdGET = function servicesServiceIdGET (req, res, next) {
  var serviceId = req.swagger.params['serviceId'].value;
  Service.servicesServiceIdGET(serviceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesGET = function servicesGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  var search = req.swagger.params['search'].value;
  Service.servicesGET(search)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
