var searchLogController = require('./searchLogController.js');

module.exports = function (app) {
  app.post('/logs', searchLogController.createSearchLog);
  app.get('/logs', searchLogController.getLogs);
  app.post('/admin', searchLogController.signIn);
  app.post('/track', searchLogController.track);
};