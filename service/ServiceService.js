'use strict';

let sqlDb;
exports.servicesDbSetup = function(connection){
  sqlDb = connection;
  console.log("checking if the services table exists");
  return sqlDb.schema.hasTable("services").then((exists) => {
    if(!exists){
      console.log("it does not exist, so let's create it");
      return sqlDb.schema.createTable("services", table => {
        table.increments();
        table.text("title");
      });
    }
    else{
      console.log("It exists");
    }
  });
};
/**
 * get info about a service
 *
 * search String generic text search (optional)
 * returns List
 **/
 /*
exports.servicesGET = function(search) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 0,
  "title" : "School"
}, {
  "id" : 0,
  "title" : "School"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
*/
exports.servicesGET = function(offset, search, limit) {
  if(!limit) limit=50;
  return sqlDb("services")
  .limit(limit)
  .offset(offset)
  .then(data => {
    return data;
  });
};


/**
 * Find service by ID
 * return a service
 *
 * serviceId Long ID of service to return
 * returns Service
 **/
exports.servicesServiceIdGET = function(serviceId) {
  return sqlDb("services").then(data => {
    for(var i=0;i<data.length;i++){
      if (data[i].id==serviceId)
        return data[i];
    }
    return "The service with id = "+serviceId+" does not exist";
  });


  /*
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "title" : "School"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
  */
};
