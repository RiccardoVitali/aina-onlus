'use strict';

const { Client } = require('pg');

const client = new Client({
  //connectionString: process.env.DATABASE_URL,
  connectionString:'postgres://isbqdpgvdgoxyl:b6bfc8722207ffe332d057a8b2a0982b266e0d13b3a220ffbfaffcd8f7705441@ec2-54-217-236-206.eu-west-1.compute.amazonaws.com:5432/dcghe6369hs0cv
'//,
//  ssl: {
//    rejectUnauthorized: false
//  }
});

client.connect();
/*
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});*/


//let pathname = window.location.pathname;
//console.log(pathname);
var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 4000;
var express = require('express');  // l'ho usato solo per caricare i file statici (lo giuro)

let serveStatic = require('serve-static');
let { setupDataLayer } = require("./service/DataLayer");

//LOGIN
let cookieSession = require("cookie-session");
let cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cookieSession({name: "session", keys: ["abc", "def"] }));

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  app.use(serveStatic(__dirname + '/www'));
  //app.use(serveStatic(__dirname + '/assets'));  // NON PERCHE QUESTO NON VA (ho dovuto usare il mio amato express)
  app.use('/assets', express.static('assets'));




async function readServices(){
  try{
    const results = await client.query("select * from service");
    console.log(results.rows);
    return results.rows;
  }
  catch(e){
    return [];
  }
}
readServices();
console.log("results.rows");



  // Start the server
  setupDataLayer().then( () => {

    http.createServer(app).listen(serverPort, function () {
      console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
      console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });
  });
});
