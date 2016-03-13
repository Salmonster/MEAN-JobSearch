var Q = require('q');
var SearchLog = require('../DBconfig.js').SearchLog;


var findAll = Q.nbind(SearchLog.find, SearchLog),
    create = Q.nbind(SearchLog.create, SearchLog);

module.exports = {

  createSearchLog: function(req, res, next) {
    // var data = findAll();
    console.log('req.body in createSearchLog: ', req.body);
    create({
      searchTerm: req.body.jobTitle,
      zipCode: req.body.zipCode,
      time: new Date(),
      ipAddress: res.connection.remoteAddress
    })
    .then(function(data) {
      res.status(201);
      res.send(res.connection.remoteAddress);
    })
    .catch(function(err) {
      res.status(500);
      res.send(err);
    })
  },

  signIn: function(req, res, next) {
    // After hardcoding an admin login user/pw combo, this should return 200 after matching
    // admin login with admin credentials in db admin collection (make new schema/model)
  },

  getLogs: function(req, res, next) {
    // Retrieve saved data from searchlogs
  },

  track: function(req, res, next) {
    // Update db admin collection with custom script
  }

}
