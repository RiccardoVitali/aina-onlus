const sqlDbFactory = require("knex");


//CHIEDI COME SI FA A FARLO PIU CARINO TIPO SERVICESERVICE.JS
let sqlDb = sqlDbFactory({
  client: "pg",
  debug: true,
  //connection: process.env.DATABASE_URL,
  connection:'postgressql://fabio:sailor@localhost:5432/demo',
  ssl: true
});
/**
 * Login
 * Login with a form
 *
 * username String
 * password String
 * no response value expected for this operation
 **/
exports.usersLoginPOST = function(username,password) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

exports.usersMeGET = function() {
  return sqlDb("users")
  .then(data => {
    return data;
  });
}
