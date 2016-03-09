exports = module.exports = {

  // Log an uncaught error and then send it to the next route,
  //   which should be 'exports.errorHandler'.
  // (The file requiring this function determines the route order.)
  errorLogger: function (error, req, res, next) {
    console.error(error.stack);
    next(error);
  },
  
  // Send an uncaught error message to the client.
  errorHandler: function (error, req, res, next) {
    res.status(500).send({error: error.message});
  }
}