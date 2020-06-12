
var User = require('../service/UserService');

exports.usersLoginPOST = function(username,password) {
  return new Promise(function(resolve, reject) {
    User.user_by_nameGET(username).then(rows => {

      if(rows==false){
        resolve(rows);
      }
      else{
        if(rows.password==password){
          resolve(rows);
        }
        else{
          resolve(true);
        }
      }
    });
  });
};
exports.usersMeGET = function(x) {
  return new Promise(function(resolve, reject) {

    User.user_by_nameGET(x).then(rows => {

      resolve(rows);
    })
  });
};
