/*
The proposal is the main model for this task.
The user will decide what the status is and based on this, it will affect
how it relates to the companies model directly, and the user indirectly.
*/

const mongoose = require('mongoose');

const proposalSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    status: {
      _id: false,
      type: String,
      enum : ['PENDING','ACCEPTED','REJECTED','CANCELLED'],
      default: 'PENDING'
    },
    location: String,
    description: String,
    boatType: String,
    service: String,
    jobType: String
});

proposalSchema.methods.updateStatus = function(newStatus){
  this.status = newStatus;
}

module.exports = mongoose.model('Proposal', proposalSchema);
