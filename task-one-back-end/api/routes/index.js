var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.MY_SECRET_KEY,
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlUpdate = require('../controllers/update');

// profile
//to view the profile the proper authorization is required
router.get('/profile', auth, ctrlProfile.profileRead);
router.post('/addcompany', ctrlProfile.addCompany);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//proposals
router.get('/pendingproposals', ctrlUpdate.PendingProposals);

router.post('/registercompany', ctrlUpdate.registerCompany);
router.post('/registerproposal', ctrlUpdate.registerProposal);
router.post('/acceptproposal', ctrlUpdate.updateProposal);
router.post('/companyproposals', ctrlUpdate.CompanyProposals);

// mock data to generate proposals
var mockData = require('../controllers/mock-data');
router.get('/genmockproposals', mockData.registerMockProposals);



module.exports = router;
