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

  constructor(public oktaAuth: OktaAuthStateService, private httpClient: HttpClient, private service: FormService) {
    //this.resource = "";
   }

  async ngOnInit(){
    await this.oktaAuth.authState$.subscribe((v: AuthState) => { 
      console.log("auth state " + v.isAuthenticated);
      this.token = v.accessToken;
      console.log("callback called, token is: " + v.accessToken?.accessToken);
      //this.getDataFromAPI();
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
    console.log("resource: " + localStorage.getItem("resourceName") as string);
    this.service.GetResource(hs, this.resource).subscribe((res) => {
      console.log('the response of the API is', res)
    }, (err) => {
      console.log('Error is', err)
    })
  }

}
