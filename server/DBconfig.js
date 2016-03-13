var mongoose = require('mongoose');
var Q = require('q');


// Connect to the online mongolab server:
mongoose.connect('mongodb://hackstallion:hackstallion@ds023108.mlab.com:23108/mean-jobsearch')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));
db.once('open', function(callback) {
  console.log('Connected to MongoDB');
});

var adminSchema = mongoose.Schema({
  searchTerm: String,
  zipCode: Number,
  time: Date,
  ipAddress: String
});


var models = {

  SearchLog: mongoose.model('SearchLog', adminSchema)

}

// Models need to be exported to controllers
module.exports = models;
