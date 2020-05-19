'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');


module.exports.eventsGET = function eventsGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  var search = req.swagger.params['search'].value;
  Event.eventsGET(limit,offset,search)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsEventIdGET = function eventsEventIdGET (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  Event.eventsEventIdGET(eventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
