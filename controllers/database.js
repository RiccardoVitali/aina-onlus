/*


var production = {
  host: "eu-cdbr-west-02.cleardb.net",
  user: "b5023d6ec13db0",
  password: "aa026dcf",
  database: "heroku_9648bd75b9a8222"
};

const options = process.env.PORT ? production : local;

console.log("options", options);


*/

require("dotenv").config();

const {Pool} = require("pg");

const isProduction = process.env.NODE_ENV === "production";

//const connectionString = 'postgressql://fabio:sailor@localhost:5432/demo';

const pool = new Pool({
  connectionString: isProduction// ? process.env.DATABASE_URL : connectionString
});

module.exports = pool;
