var mongoose = require('mongoose');
var Q = require('q');


// Connect to the online mongolab server:
mongoose.connect('mongodb://hackstallion:hackstallion@ds023108.mlab.com:23108/mean-jobsearch')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));
db.once('open', function(callback) {
  console.log('Connected to MongoDB');
});


var jobSchema = mongoose.Schema({
  jobProps: Array,
  jobProperties: String,
  stringifiedObject: { type: String, default: '{}' }
});

var adminSchema = mongoose.Schema({
  stats: String,
  hits: Number
});

var models = {

  Jobs: mongoose.model('Jobs', jobSchema),
  Admin: mongoose.model('Admin', adminSchema)

}

// Models need to be exported to controllers
module.exports = models;

// See http://stackoverflow.com/questions/23692996/how-could-i-bind-save-method-using-q-with-mongoose
Jobs.save = Q.nbind(Jobs.save, Jobs);
