import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: 'bobby@digital.com',
    password: 'password'
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  //the button click listener; the login info is sent to the back end for
  //authorization. if the authorization is successful the user is redirected
  //to the profile page.
  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

}
