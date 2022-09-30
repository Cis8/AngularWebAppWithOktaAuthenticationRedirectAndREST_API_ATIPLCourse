import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState, OktaAuth, UserClaims } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //token: string | undefined = "";
  userClaims: UserClaims | undefined;
  constructor(
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth, protected authStateService: OktaAuthStateService) {
      oktaAuth.getUser().then(v => {
        this.userClaims = v;
      });
  }

  async login() {
    await this.oktaAuth.signInWithRedirect().then(() => {
      this.oktaAuth.getAccessToken();
      //console.log("Token: " + this.token);
    });
    
    
  }

  async logout() {
    so: 
    await this.oktaAuth.signOut();
  }

}



