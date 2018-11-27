import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';

export interface Proposal {
  _id: string;
  location: String;
  description: String;
  name: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProposalsService {

  constructor(private http: HttpClient) { }


  public getPendingProposals() : Observable<any> {
      return this.http.get('http://localhost:8000/api/pendingproposals');
  }

  public acceptProposal(proposalId: string, companyId: string, accept: boolean) : Observable<any> {
   //  console.log('sending co id: ' + companyId);
   //  console.log('sending prop id: ' + proposalId);
   //  console.log('params: ');

   var values = {
     companyid: companyId,
     proposalid: proposalId,
     accepted: accept
   }
   var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<string>('http://localhost:8000/api/acceptproposal', values);
  }


}
