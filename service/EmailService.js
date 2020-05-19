'use strict';


 const sqlDbFactory = require("knex");
 let sqlDb = sqlDbFactory({
   client: "pg",
   debug: true,
   //connection: process.env.DATABASE_URL,
   connection:'postgressql://fabio:sailor@localhost:5432/demo',
   ssl: true
 });


exports.emailPOST = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "email" : "email"
}, {
  "email" : "email"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

/*
app.post('/', async (req, res) => {
  let message = [];
  let email = req.body;
  pool.query(
    `select * from email
    where email = $1`,[email],(err, results) => {
      if (err){
        throw err;
      }
      if(results.rows.length > 0){
        message.push("This email is already registered for the newsletter");
        res.render("newsletter",{message});
      }
      else{
        pool.query(
          `insert into email (email)
          values ($1)`, [email], (err, results) => {
            if (err){
              throw err
            }
            message.push("You are registered for the newsletter!");
            res.render("newsletter",{message});
          }
        );
      }
    }
  );
});
*/
