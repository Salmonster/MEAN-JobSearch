var searchLogController = require('./searchLogController.js');

module.exports = function (app) {
  app.post('/logs', searchLogController.createSearchLog);
  app.get('/logs', searchLogController.getLogs);
  
  //For one-time use...
  app.post('/admin/signup', searchLogController.signUp);
  
  app.post('/admin', searchLogController.signIn);
  app.get('/track', searchLogController.track);
  app.post('/track', searchLogController.updateTracker);
};