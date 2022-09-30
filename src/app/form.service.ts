import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private httpClient: HttpClient) { }

  GetResource(headers: HttpHeaders) {
    return this.httpClient.get('/api/whoami', { headers })
  }
}
