'use strict';

//let sqlDb = require("./DataLayer.js")
const sqlDbFactory = require("knex");
let sqlDb = sqlDbFactory({
  client: "pg",
  debug: true,
  //connection: process.env.DATABASE_URL,
  connection:'postgressql://fabio:sailor@localhost:5432/demo',
  ssl: true
});

exports.servicesDbSetup = function(connection){
  sqlDb = connection;
  console.log("checking if the services table exists");
  return sqlDb.schema.hasTable("services").then((exists) => {
    if(!exists){
      console.log("it does not exist, so let's create it");
      return sqlDb.schema.createTable("services", table => {
        table.increments();
        table.text("title");
      });
    }
    else{
      console.log("It exists");
    }
  });
};

exports.servicesGET = function(offset, search, limit) {
  if(!limit) limit=50;
  return sqlDb("services")
  .limit(limit)
  .offset(offset)
  .then(data => {
    return data;
  });
};



exports.servicesServiceIdGET = function(serviceId) {
  return sqlDb("services").then(data => {
    for(var i=0;i<data.length;i++){
      if (data[i].id==serviceId)
        return data[i];
    }
    return "The service with id = "+serviceId+" does not exist";
  });

};
