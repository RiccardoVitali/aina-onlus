//let {servicesDbSetup} = require("./ServiceService");


const sqlDbFactory = require("knex");

let sqlDb = sqlDbFactory({
  client: "pg",
  debug: true,
  //connection: process.env.DATABASE_URL,
  connection:'postgressql://federicopozzi:semplice@localhost:5433/template1',
  ssl: true
});


/*function setupDataLayer(){
  console.log("setting up Data Layer");
  return servicesDbSetup(sqlDb);
}*/
module.exports = sqlDb;
//module.exports = {database: sqlDb}//, setupDataLayer};
