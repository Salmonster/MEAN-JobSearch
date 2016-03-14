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
    // Adds search criteria and user's IP address into SearchLog database
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
      res.status(400).send(err);
    });
  },

  // For one-time use...

  // signUp: function (req, res, next) {
  //   // Sign up an admin
  //   var username = req.body.username;
  //   var password = req.body.password;
  //   var customScript = req.body.customScript;
  //   createAdmin({
  //     username: username,
  //     password: password,
  //     customScript: customScript
  //   })
  //   .then(function() {
  //     res.sendStatus(201);
  //   })
  //   .catch(function(err) {
  //     res.status(500);
  //     res.status(400).send(err);
  //   });
  // },

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
        res.status(403).send(err);
      });
  },

  getLogs: function(req, res, next) {
    // Retrieve saved data from SearchLog db
    findAllSearches()
      .then(function(results) {
        res.send(results);
      })
      .fail(function(err) {
        res.status(400).send(err);
      });
  },

  track: function(req, res, next) {
    // Retrieve custom script from Admin db
    findAdmin()
      .then(function(result) {
        res.send(result.customScript);
      })
      .fail(function(err) {
        res.status(400).send(err);
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
          res.status(400).send(err);
        });
    })
    .fail(function(err) {
      res.status(400).send(err);
    });
  }

}
