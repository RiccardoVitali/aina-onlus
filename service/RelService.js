'use strict';

//CHIEDI COME SI FA A FARLO PIU CARINO TIPO SERVICESERVICE.JS
const sqlDbFactory = require("knex");
let sqlDb = sqlDbFactory({
  client: "pg",
  debug: true,
  //connection: process.env.DATABASE_URL,
  connection:process.env.DATABASE_URL || 'postgressql://federicopozzi:semplice@localhost:5433/template1',
  ssl: true
});


exports.relDbSetup = function(connection){
  sqlDb = connection;
  console.log("checking if the people_services table exists");
  return sqlDb.schema.hasTable("rel").then((exists) => {
    if(!exists){
      console.log("it does not exist, so let's create it");
      return sqlDb.schema.createTable("rel", table => {
        table.increments();
        table.text("title");
      });
    }
    else{
      console.log("It exists");
    }
  });
};


exports.relGET = function() {
  return sqlDb("rel")
  .then(data => {
    return data;
  });
};
