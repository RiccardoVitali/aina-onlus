'use strict';


//CHIEDI COME SI FA A FARLO PIU CARINO TIPO SERVICESERVICE.JS
const sqlDbFactory = require("knex");
let sqlDb = sqlDbFactory({
  client: "pg",
  debug: true,
  //connection: process.env.DATABASE_URL,
  connection:'postgressql://federicopozzi:semplice@localhost:5433/template1',
  ssl: true
});



exports.eventsDbSetup = function(connection){
  sqlDb = connection;
  console.log("checking if the events table exists");
  return sqlDb.schema.hasTable("events").then((exists) => {
    if(!exists){
      console.log("it does not exist, so let's create it");
      return sqlDb.schema.createTable("events", table => {
        table.increments();
        table.text("title");
      });
    }
    else{
      console.log("It exists");
    }
  });
};

/**
 * Find event by ID
 * return an event
 *
 * eventId Long ID of event to return
 * returns Event
 **/
 /*
exports.eventsEventIdGET = function(eventId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "date",
  "service_id" : 1,
  "name" : "name",
  "description" : "description",
  "location" : "location",
  "id" : 0,
  "photo_url" : "photo_url",
  "person_id" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
*/

exports.eventsGET = function(offset, search, limit) {
  if(!limit) limit=50;
  return sqlDb("events")
  .limit(limit)
  .offset(offset)
  .then(data => {

    return data;
  });
};

exports.eventsEventIdGET = function(eventId) {
  return sqlDb("events").then(data => {
    for(var i=0;i<data.length;i++){
      if (data[i].id==eventId)
        return data[i];
    }
    return "The event with id = "+eventId+" does not exist";
  });
};
/**
 * get info about an event
 *
 * limit Integer maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0 (optional)
 * search String generic text search (optional)
 * returns List
 **/

/*
exports.eventsGET = function(limit,offset,search) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "date",
  "service_id" : 1,
  "name" : "name",
  "description" : "description",
  "location" : "location",
  "id" : 0,
  "photo_url" : "photo_url",
  "person_id" : 6
}, {
  "date" : "date",
  "service_id" : 1,
  "name" : "name",
  "description" : "description",
  "location" : "location",
  "id" : 0,
  "photo_url" : "photo_url",
  "person_id" : 6
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
*/
