'use strict';


const sqlDbFactory = require("knex");
let sqlDb = sqlDbFactory({
  client: "pg",
  debug: true,
  connection: process.env.DATABASE_URL,
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

