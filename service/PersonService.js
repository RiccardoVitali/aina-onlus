'use strict';


//CHIEDI COME SI FA A FARLO PIU CARINO TIPO SERVICESERVICE.JS
const sqlDbFactory = require("knex");
let sqlDb = sqlDbFactory({
  client: "pg",
  debug: true,
  //connection: process.env.DATABASE_URL,
  connection:'postgressql://fabio:sailor@localhost:5432/demo',
  ssl: true
});


exports.peopleDbSetup = function(connection){
  sqlDb = connection;
  console.log("checking if the people table exists");
  return sqlDb.schema.hasTable("people").then((exists) => {
    if(!exists){
      console.log("it does not exist, so let's create it");
      return sqlDb.schema.createTable("people", table => {
        table.increments();
        table.text("title");
      });
    }
    else{
      console.log("It exists");
    }
  });
};


exports.peopleGET = function(offset, search, limit) {
  if(!limit) limit=50;
  return sqlDb("people")
  .limit(limit)
  .offset(offset)
  .then(data => {

    return data;
  });
};


exports.peoplePersonIdGET = function(personId) {
  return sqlDb("people").then(data => {
    for(var i=0;i<data.length;i++){
      if (data[i].id==personId)
        return data[i];
    }
    return "The person with id = "+personId+" does not exist";
  });
};
