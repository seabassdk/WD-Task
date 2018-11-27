/*
The company model is simplified, but has an emphasis on the proposals it manages.
Whenever a proposal is accepteted or rejected by the company it will be referenced.
*/

const mongoose = require('mongoose');

const Proposal = require("./proposals");

const companySchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    active: Boolean,
    proposals : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Proposal' }]
});

module.exports = mongoose.model('Company', companySchema);
