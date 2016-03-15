var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var Path = require('path');
var helpers = require('./helpers.js');
var app = express();


app.set('port', (process.env.PORT || 3000));

// Set up express formatting, http reporting, & cookie parsing
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Redirect requests for local files to the 'client' directory
var assetFolder = Path.resolve(__dirname, '../client');
app.use(express.static(assetFolder));

// Initialize routers.
var searchLogRouter = express.Router();

// Configure routers.
require('./searchLogs/searchLogRoutes.js')(searchLogRouter);

// Set up route forwarding.
app.use('/api', searchLogRouter);

// Handle uncaught errors.
app.use(helpers.errorLogger);
app.use(helpers.errorHandler);

// Run the server.
app.listen(app.get('port'), function(){
  console.log('Listening on port', app.get('port'));
});
