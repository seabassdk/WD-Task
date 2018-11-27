import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { ProposalsService, Proposal } from '../proposals.service';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css']
})
export class ProposalsComponent implements OnInit {
  userDetails: UserDetails;
  pendingProposals: Proposal[];



  constructor(private auth: AuthenticationService, private proposalsService: ProposalsService) { }

  ngOnInit() {

    //Get the user details for the logged in user
    this.auth.profile().subscribe(user => {
      this.userDetails = user;
      console.log(this.userDetails);
    }, (err) => {
      console.error(err);
    });

    //Populate the active tab with 'pending proposals'
    this.proposalsService.getPendingProposals().subscribe(data => {
      this.pendingProposals = data.proposals;
      console.log('Pending proposals:');
      console.log(this.pendingProposals);
    }, (err) => {
      console.error(err);
    });

  }


  //The button click listener to change to accept or reject: makes a call to the
  //proposal service to save the state in the backend.
  updateProposal(proposalIndex, accept){

    //check whether the accept or reject button has been clicked
    var proposalId = this.pendingProposals[proposalIndex]._id;

    //for now assume that only one company per user
    var companyId = this.userDetails.companies[0];
    this.proposalsService.acceptProposal(proposalId,companyId, accept).subscribe(data => {
      //when the new status has been changed remove the proposal from the list
      this.pendingProposals.splice(proposalIndex, 1);
    }, (err) => {
      console.error(err);
    });
  }

}
