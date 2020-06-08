

require("dotenv").config();

const {Pool} = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = 'postgressql://federicopozzi:semplice@localhost:5433/template1';

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});

module.exports = pool;
