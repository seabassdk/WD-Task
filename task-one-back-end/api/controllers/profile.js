var mongoose = require('mongoose');
require('../models/users');
require('../models/companies');
var Company = mongoose.model('Company');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }
};

module.exports.addCompany = function(req, res) {
  var user_id = req.query.userid;
  var company_id = req.query.companyid;
  User.update({ _id: user_id }, { "$push": { companies: company_id }},
    (error) => {
      if(error)  console.log(error);
      res.send("Co. added"); }
  );
};
