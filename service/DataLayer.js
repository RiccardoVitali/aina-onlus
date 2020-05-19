let {servicesDbSetup} = require("./ServiceService");
//let {eventsDbSetup} = require("./EventService");  //SERVONO?
//let {peopleDbSetup} = require("./PersonService");  //SERVE??

const sqlDbFactory = require("knex");

let sqlDb = sqlDbFactory({
  client: "pg",
  debug: true,
  //connection: process.env.DATABASE_URL,
  connection:'postgressql://fabio:sailor@localhost:5432/demo',
  ssl: true
});

function setupDataLayer(){
  console.log("setting up Data Layer");
  return servicesDbSetup(sqlDb);
}

module.exports = {database: sqlDb, setupDataLayer};
