import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AccessToken, AuthState } from '@okta/okta-auth-js';
import { FormService } from '../form.service';


@Component({
  selector: 'protected-form',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {


  token : undefined | AccessToken;

  constructor(public oktaAuth: OktaAuthStateService, private httpClient: HttpClient, private service: FormService) { }

  async ngOnInit(){
    await this.oktaAuth.authState$.subscribe((v: AuthState) => { 
      console.log("auth state " + v.isAuthenticated);
      this.token = v.accessToken;
      console.log("callback called, token is: " + v.accessToken?.accessToken);
      this.getDataFromAPI();
    })
  }

  GetResource() {
    //this.getDataFromAPI()
  }

  getDataFromAPI(){
    let hs: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.token?.accessToken as string
    });
    console.log("au tok in getDataFromApi: " + this.token as string);
    this.service.GetResource(hs).subscribe((res) => {
      console.log('the response of the API is', res)
    }, (err) => {
      console.log('Error is', err)
    })
  }

}
