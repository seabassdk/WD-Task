var passport = require('passport');
var mongoose = require('mongoose');
require('../models/users');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//Register a new user. After the user is saved in the database,
//a jwt will be generated and sent back to the front end
module.exports.register = function(req, res) {

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    //send an authorization token to the front end
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

//is called when the user logs in
module.exports.login = function(req, res) {

  //The 'user' from the passport strategy callback (config/passport.js)
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found send the token
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found or credentials missing
      res.status(401).json(info);
    }
  })(req, res);

};
