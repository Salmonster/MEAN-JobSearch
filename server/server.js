var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Path = require('path');
var helpers = require('./helpers.js');


module.exports = app = express();

app.set('port', (process.env.PORT || 3000));

// Set up express formatting and http reporting.
app.use(bodyParser.json());
app.use(morgan('dev'));

// Redirect requests for local files to the 'client' directory
var assetFolder = Path.resolve(__dirname, '../client');
app.use(express.static(assetFolder));

// Initialize routers.
// var userRouter = express.Router();
// var adminRouter = express.Router();

// Configure routers.
// require('./server/admin/adminRoutes.js')(adminRouter);
// require('./server/users/userRoutes.js')(userRouter);

// Set up route forwarding.
// app.use('/api/admin', adminRouter);
// app.use('/', userRouter);

// Handle uncaught errors.
app.use(helpers.errorLogger);
app.use(helpers.errorHandler);

// Run the server.
app.listen(app.get('port'), function(){
  console.log('Listening on port', app.get('port'));
});
