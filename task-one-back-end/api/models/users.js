/*
The user model is very simplified in this task.
The emphasis is put on the password and authentication. There are helper
methods to generate a new password, and a method to validate existing passwords.
*/

var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

const Company = require("./companies");

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  companies : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

//genereate jwt for the user-- will be called after login or registration
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000), // + (60 * 60) Token lasts for one hour
  }, process.env.MY_SECRET_KEY); // Getting the key from the environment process
};

module.exports = mongoose.model('User', userSchema);
