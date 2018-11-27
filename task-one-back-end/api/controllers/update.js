/*
This controller will deal with all the incoming requests to update the
proposals and companies in the database.
*/

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('../models/users');
require('../models/companies');
require('../models/proposals');
var User = mongoose.model('User');
var Company = mongoose.model('Company');
var Proposal = mongoose.model('Proposal');

//To create a new company
module.exports.registerCompany = function(req, res) {

  var company = new Company();

  company.name = req.query.name;
  company.active = true;

  company.save(function(err, savedCompany) {
    res.status(200);
    res.json({
      "msg" : 'Company saved'
    });
  });
};

//This function is called to create a new proposal with the
// query parameters
module.exports.registerProposal = function(req, res) {

  var proposal = new Proposal();

  proposal.name = req.query.name;
  proposal.location = req.query.location;
  proposal.description = req.query.description;
  proposal.boatType = req.query.boatType;
  proposal.service = req.query.service;
  proposal.jobType = req.query.jobType;

  proposal.save(function(err, savedProposal) {
    res.status(200);
    res.json({
      "msg" : 'Proposal saved.'
    });
  });
};

//Called when the user requests to either accept or rejct a proposal.
//First, the proposal will be updated with the new status.
//Then, the proposal will be added to the company's list of accepted
//proposals.
module.exports.updateProposal = function(req, res) {

  var company_id = req.body.companyid;
  var proposal_id = req.body.proposalid;

  //update to the new status
  var status
  if(req.body.accepted)
    status = "ACCEPTED";
  else
    status = "REJECTED";


  if(company_id && proposal_id){

  Proposal.findById(proposal_id, (err, proposal) => {
    if (err) {
      console.log('sending err...');
      res.status(404).json(err);
      return;
    }
    //THIS IS WHERE THE STATUS IS CHANGED AND SAVED IN THE DATABASE
    proposal.status = status;

    proposal.save((error) => {
      if (err) {
        console.log('sending err...');
        res.status(404).json(err);
        return;
      }
      //Once the proposal has been updated, add the newly created id,
      //to the companies proposals list
      Company.findById(company_id, (err, company) => {

        company.proposals.push(proposal._id);

        company.save((error) => {
          if (err) {
            console.log('sending err...');
            res.status(404).json(err);
            return;
          }
          res.status(200);
          res.json({
            "msg" : "everything updated."
          });
        });


      });

    });
  });

  } else {
    res.status(200);
    res.json({
      "msg" : "ids were empty"
    });
  }
};

//SEND ALL THE PROPOSALS WITH STATUS PENDING
module.exports.PendingProposals = function(req, res) {
  Proposal
      .find({})
      .where('status').equals("PENDING")
      .exec((err, proposals) => {
        res.json({ proposals });
      });
};

//return all the proposals that are associated with this company
// based on the status query
module.exports.CompanyProposals = function(req, res) {

  var company_id = req.query.companyid;
  var status = req.query.status;

  Company.findById(company_id, (err, company) => {
    if (err) {
      console.log('sending err...');
      res.status(404).json(err);
      return;
    }

    Proposal
        .find({'_id': { $in: company.proposals}})
        .where('status').equals(status)
        .exec((err, proposals) => {
          res.json({ proposals });
        });
    // res.status(200).json(company.proposals);
  });
}
