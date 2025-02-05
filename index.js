'use strict';
const pool = require("./controllers/database");

const fs = require('fs'),
    path = require('path'),
    http = require('http');

const express = require("express");
const app = express();
const serveStatic = require("serve-static");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const serverPort = process.env.PORT || 4000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

//LOGIN
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

//redirect from /docs to /backend/swaggerui
const swaggerUi = require('swagger-ui-express');
app.use('/backend/swaggerui', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

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

  app.use(serveStatic(__dirname + '/public'));
  app.use(serveStatic(__dirname + '/public/pages'));
  app.use(express.static('public'));


  //NEWSLETTER-NEWSLETTER-NEWSLETTER-NEWSLETTER-NEWSLETTER
  var Email = require('./service/EmailService');

      app.post("/newsletter",(req, res) => {
        req.on('data', function(chunk) {

        var email = chunk.toString();
        if(email.length==2){
        res.sendStatus(402);
        return;
      }
        Email.emailGET().then(function (response) {
        var check = false;
        var i=0;
        while(i<response.length && check==false){
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
   });
  });

    // CONTACT FORM -- CONTACT FORM -- CONTACT FORM -- CONTACT FORM -- CONTACT FORM --
  var Contact_form = require('./service/Contact_formService');

      app.post("/contact",(req, res) => {
        req.on('data', function(chunk) {

        var split = chunk.toString().substring(1,chunk.toString().length-1).split(",");
        var name = split[0];
        var email = split[1];
        var subject = split[2];
        var message = "";
        for(var i=3;i<split.length-1;i++){
        message += split[i] + ",";
        }
        message += split[split.length-1];
        if(email.length==2 || name.length==2 || subject.length==2 || message.length==2){
        res.sendStatus(402);
        return;
      }
      else{
        res.sendStatus(301);
        pool.query(
          `insert into contact_form (name,email,subject,message) values ($1,$2,$3,$4)`, [name,email,subject,message]
        );
        console.log("message put into db");
        return;
      }

    })
  });


    // SIGN UP --- SIGN UP --- SIGN UP --- SIGN UP --- SIGN UP --- SIGN UP --- SIGN UP --- SIGN UP ---
  var User = require('./service/UserService');

      app.post("/signup",(req, res) => {
        req.on('data', function(chunk) {

        var split = chunk.toString().substring(1,chunk.toString().length-1).split(",");
        var username = split[0].substring(1,split[0].length-1);
        var email = split[1].substring(1,split[1].length-1);
        var password = split[2].substring(1,split[2].length-1);
        var password2 = split[3].substring(1,split[3].length-1);

        if(email.length==0 || username.length==0 || password.length==0 || password2.length==0){
        res.sendStatus(402);
        return;
      }
      if(password!=password2){
        res.sendStatus(405);
        return;
      }
      User.userGET().then(function (response) {
      var checkuser = false;
      var checkemail = false;
      var i=0;
      while(i<response.length && checkuser == false){
        if(response[i].username.trim()==username.trim() ){
          checkuser=true;
        }
        if(response[i].email.trim()==email.trim() ){
          checkemail=true;
        }
        i++;
      }
    if(checkuser==true){
      console.log("checkuser_is_true");
      res.sendStatus(400);
      return;
    }
    if(checkemail==true){
      console.log("checkemail_is_true");
      res.sendStatus(403);
      return;
    }
    else{
      console.log("check_is_false");
      res.sendStatus(301);
      pool.query(
        `insert into users (username,email,password) values ($1,$2,$3)`, [username,email,password]
      );
      console.log("user inserito");
      return;
      }
    });
  });
});


  // Start the server
    http.createServer(app).listen(serverPort, function () {
      console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
      console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });
});
