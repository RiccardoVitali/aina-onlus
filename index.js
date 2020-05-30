'use strict';
const pool = require("./controllers/database");

/*
const { Client } = require('pg');

const client = new Client({
  //connectionString: process.env.DATABASE_URL,
  connectionString:'postgressql://fabio:sailor@localhost:5432/demo',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});*/


//let pathname = window.location.pathname;
//console.log(pathname);
const fs = require('fs'),
    path = require('path'),
    http = require('http');

//var app = require('connect')();
const express = require("express");
const app = express();
const routes = require("./routes");
const serveStatic = require("serve-static");
//const session = require("express-session");
const session = require("cookie-session");
const cookieParser = require("cookie-parser");
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const serverPort = process.env.PORT || 4000;
//var express = require('express');  // l'ho usato solo per caricare i file statici (lo giuro)
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
//const { setupDataLayer } = require("./service/DataLayer");

//LOGIN
const cookieSession = require("cookie-session");
app.use(cookieSession({name: "session", keys: ["abc", "def"] }));
/*
const {
  PORT,
  NODE_ENV,
  SESS_NAME,
  SESS_LIFTETIME,
  SESS_SECRET
} = require("./configs/config");

const IN_PROD = NODE_ENV === "production";

app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFTETIME,
      sameSite: true,
      secure: IN_PROD
    }
  })
);
*/
app.use(cookieParser());

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
  app.use(serveStatic(__dirname));

  app.use(serveStatic(__dirname + '/www'));
  //app.use(serveStatic(__dirname + '/assets'));  // NON PERCHE QUESTO NON VA (ho dovuto usare il mio amato express)
  app.use('/assets', express.static('assets'));


  //NEWSLETTER-NEWSLETTER-NEWSLETTER-NEWSLETTER-NEWSLETTER
  var Email = require('./service/EmailService');

      app.post("/newsletter",(req, res) => {
        req.on('data', function(chunk) {

        //grab form data as string
        var email = chunk.toString();
        if(email.length==2){
        res.sendStatus(402);
        return;
      }
        Email.emailGET().then(function (response) {
        var check = false;
        var i=0;
        while(i<response.length && check==false){
          //console.log(check);
          if(response[i].e.trim()==email.trim() ){
            check=true;
          }
          i++;
        }
      if(check==true){
        console.log("check_is_true");
        res.sendStatus(400);
        return;
      }
      else{
        console.log("check_is_false");
        res.sendStatus(301);
        pool.query(
          `insert into email (e) values ($1)`, [email]
        );
        console.log("email inserita");
        return;
      }
    });
    //res.end();
    });
  });

  // Start the server
  //setupDataLayer().then( () => {

    http.createServer(app).listen(serverPort, function () {
      console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
      console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });
  //});
});
