import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AccessToken, AuthState } from '@okta/okta-auth-js';
import { FormService } from '../form.service';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'protected-form',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {


  token : undefined | AccessToken;
  resource: string = "";
  jsonResource: String = "";
  requestSucceded : number = -1;

  constructor(public oktaAuth: OktaAuthStateService, private httpClient: HttpClient, private service: FormService) {
   }

  async ngOnInit(){
    await this.oktaAuth.authState$.subscribe((v: AuthState) => { 
      this.token = v.accessToken;
    })
  }


  GetResource(){
    this.getDataFromAPI();
  }

  getDataFromAPI(){
    let hs: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.token?.accessToken as string
    });
    
    this.resource = (<HTMLInputElement>document.getElementById("resourceInput")).value;
    this.service.GetResource(hs, this.resource).subscribe((res: Object) => {
      this.jsonResource = JSON.stringify(res.valueOf());
      console.log('the response of the API is', res.valueOf());
      this.requestSucceded = 0;
    }, (err) => {
      console.log('Error is', err)
      this.requestSucceded = 1;
    })
  }

}
