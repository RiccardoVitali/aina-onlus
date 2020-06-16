const sqlDbFactory = require("knex");


let sqlDb = sqlDbFactory({
  client: "pg",
  debug: true,
  connection: process.env.DATABASE_URL,
  ssl: true
});

exports.userGET = function() {
   return sqlDb("users")
   .then(data => {
     return data;
   });
 };
 exports.user_by_nameGET = function(username) {

   return sqlDb("users")
   .then(data => {
     for(var i=0;i<data.length;i++){
       if(data[i].username==username){
         return data[i];
       }
     }
     return false;
   });
 };
