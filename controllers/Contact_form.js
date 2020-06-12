'use strict';

var utils = require('../utils/writer.js');
var Contact_form = require('../service/Contact_formService');

module.exports.contact_formGET = function contact_formGET (req, res, next) {
  Contact_form.contact_formGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
