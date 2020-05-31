'use strict';


 const sqlDbFactory = require("knex");
 let sqlDb = sqlDbFactory({
   client: "pg",
   debug: true,
   //connection: process.env.DATABASE_URL,
   connection:'postgressql://fabio:sailor@localhost:5432/demo',
   ssl: true
 });


 exports.contact_formGET = function() {
   return sqlDb("contact_form")
   .then(data => {
     return data;
   });
 };
