var mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('../models/users');
require('../models/companies');
require('../models/proposals');
var User = mongoose.model('User');
var Company = mongoose.model('Company');
var Proposal = mongoose.model('Proposal');

module.exports.registerMockProposals = function(req, res) {

  var jobTypes = ["normal","emergency"];
  var locations = ["Frederiksberg","Vesterbro","Osterbro","Norrebro","Klampenborg"];
  var boatTypes = ["Motor Boat","Sail Boat","Yacht", "Speed Boat"];
  var services = ["Engine Repair", "Painting", "Maintenance", "Sail Repair"];

  var numProposals = 6;
  var proposals = [];
  var proposal;

  var i;
  for(i=0; i<6; i++){
    proposal = new Proposal();

    proposal.jobType = jobTypes[Math.floor(Math.random()*jobTypes.length)];
    proposal.location = locations[Math.floor(Math.random()*locations.length)];
    proposal.boatType = boatTypes[Math.floor(Math.random()*boatTypes.length)];
    proposal.service = services[Math.floor(Math.random()*services.length)];

    proposal.description = proposal.jobType + " " + proposal.service + " for " + proposal.boatType;

    proposals.push(proposal);
  }

  // Proposal.save(function(err, savedProposal) {
  //   console.log('returning the saved proposal');
  //   console.log(savedProposal);
  //   res.status(200);
  //   res.json({
  //     "msg" : 'Saved.'
  //   });
  // });

  Proposal.collection.insert(proposals, function (err, docs) {
  if (err){
      return console.error(err);
  } else {
    console.log("Multiple documents inserted to Collection");
    res.status(200);
    res.json({
      "msg" : 'Proposal Collection Saved.'
    });
  }
});
};
