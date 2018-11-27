var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
require('../models/users');
var User = mongoose.model('User');

/*
The passport will be the middleware that checks if the user exists and
checks if the password is correct. If it does it will return the 'User'.

It will serve as the callback function for the authentication controller.
*/

passport.use(new LocalStrategy({
    usernameField: 'email'  //by default it's not expecting an email- set email
  },
  function(username, password, done) {
    console.log('in the passport strategy');
    User.findOne({ email: username }, function (err, user) {

      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));
