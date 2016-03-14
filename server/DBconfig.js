var mongoose = require('mongoose');
var Q = require('q');
var bcrypt   = require('bcrypt-nodejs');


// Connect to the online mongolab server:
mongoose.connect('mongodb://hackstallion:hackstallion@ds023108.mlab.com:23108/mean-jobsearch');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));
db.once('open', function(callback) {
  console.log('Connected to MongoDB');
});

var searchSchema = mongoose.Schema({
  searchTerm: String,
  zipCode: Number,
  time: Date,
  ipAddress: String
});

var adminSchema = mongoose.Schema({
  username: String,
  password: String,
  customScript: String
});

adminSchema.methods.isPassword = function(attempted) {
  return bcrypt.compareSync(attempted, this.password);
};

var SALT_WORK_FACTOR  = 10;

adminSchema.pre('save', function (next) {
  var admin = this;
  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }
    // Hash the password along with our new salt
    bcrypt.hash(admin.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      // Override the cleartext password with the hashed one
      admin.password = hash;
      admin.salt = salt;
      next();
    });
  });
});

var models = {

  SearchLog: mongoose.model('SearchLog', searchSchema),
  Admin: mongoose.model('Admin', adminSchema)

}

// Models need to be exported to controllers
module.exports = models;
