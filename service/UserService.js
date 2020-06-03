const sqlDbFactory = require("knex");


//CHIEDI COME SI FA A FARLO PIU CARINO TIPO SERVICESERVICE.JS
let sqlDb = sqlDbFactory({
  client: "pg",
  debug: true,
  //connection: process.env.DATABASE_URL,
  connection:process.env.DATABASE_URL || 'postgressql://federicopozzi:semplice@localhost:5433/template1',
  ssl: true
});

exports.userGET = function() {
   console.log("userGET")
   return sqlDb("users")
   .then(data => {
     return data;
   });
 };
 exports.user_by_nameGET = function(username) {
   console.log("user_by_nameGET")

   //console.log(username);
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
