var Q = require('q');
var SearchLog = require('../DBconfig.js').SearchLog;
var Admin = require('../DBconfig.js').Admin;


var createSearch = Q.nbind(SearchLog.create, SearchLog),
    findAllSearches = Q.nbind(SearchLog.find, SearchLog),
    createAdmin = Q.nbind(Admin.create, Admin),
    findAdmin = Q.nbind(Admin.findOne, Admin),
    updateScript = Q.nbind(Admin.update, Admin);

module.exports = {

  createSearchLog: function(req, res, next) {
    createSearch({
      searchTerm: req.body.jobTitle,
      zipCode: req.body.zipCode,
      time: new Date(),
      ipAddress: res.connection.remoteAddress
    })
    .then(function() {
      res.status(201);
      res.send(res.connection.remoteAddress);
    })
    .catch(function(err) {
      res.status(500);
      res.send('createSearchLog error: ', err);
    });
  },

  signUp: function (req, res, next) {
    // For one-time use...
    var username = req.body.username;
    var password = req.body.password;
    var customScript = req.body.customScript;
    createAdmin({
      username: username,
      password: password,
      customScript: customScript
    })
    .then(function() {
      res.sendStatus(201);
    })
    .catch(function(err) {
      res.status(500);
      res.send('signUp error: ', err);
    });
  },

  signIn: function(req, res, next) {
    // Checks admin credentials in Admin db
    var username = req.body.username;
    var password = req.body.password;

    findAdmin({ username: username })
      .then(function(admin) {
        if (!admin) {
          // Bad username
          throw new Error('Username does not exist');
        } else if (!admin.isPassword(password)) {
          // Bad password
          throw new Error('Incorrect password');
        } else {
          // Success
          res.sendStatus(200);
        }
      })
      .fail(function(err) {
        res.send('signIn error: ', err);
      });
  },

  getLogs: function(req, res, next) {
    // Retrieve saved data from searchlogs
    findAllSearches()
      .then(function(results) {
        res.send(results);
      })
      .fail(function(err) {
        res.send('getLogs error: ', err);
      });
  },

  track: function(req, res, next) {
    // Retrieve customScript from Admin db
    findAdmin()
      .then(function(results) {
        res.send(results.customScript);
      })
      .fail(function(err) {
        res.send('track error: ', err);
      });
  },

  updateTracker: function(req, res, next) {
    // Update Admin db with custom script
    findAdmin()
    .then(function(results) {
      updateScript({ customScript: req.body.customScript })
        .then(function() {
          res.sendStatus(201);
        })
        .catch(function(err) {
          res.status(500);
          res.send('updateTracker updateScript error: ', err);
        });
    })
    .fail(function(err) {
      res.send('updateTracker findAdmin error: ', err);
    });
  }

}
