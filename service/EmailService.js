'use strict';


const sqlDbFactory = require("knex");
let sqlDb = sqlDbFactory({
  client: "pg",
  debug: true,
  connection: process.env.DATABASE_URL,
  ssl: true
});


 exports.emailGET = function() {
   return sqlDb("email")
   .then(data => {
     return data;
   });
 };
