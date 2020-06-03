
var User = require('../service/UserService');

exports.usersLoginPOST = function(username,password) {
  console.log("usersLoginPOST");
  return new Promise(function(resolve, reject) {
    User.user_by_nameGET(username).then(rows => {

      if(rows==false){
        console.log("non esiste un account con questo username");
        resolve(rows);
      }
      else{
        if(rows.password==password){
          console.log("password corretta");
          console.log(rows);
          resolve(rows);
        }
        else{
          console.log("password errata");
          resolve(true);
        }
      }
    });
  });
};
exports.usersMeGET = function(x) {
  console.log("usersMeGET");
  return new Promise(function(resolve, reject) {

    User.user_by_nameGET(x).then(rows => {
      console.log("r");
      console.log(rows);
      resolve(rows);
    })
  });
};
