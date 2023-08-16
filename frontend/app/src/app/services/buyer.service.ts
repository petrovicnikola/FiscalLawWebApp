import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private http: HttpClient) { }

  getBillsForBuyer(identifierNumber){
    const data = {
      identifierNumber: identifierNumber
    }

    return this.http.post('http://localhost:4000/firm/getBillsForBuyer', data);
  }

  getIdentifierNumber(username){
    const data = {
      username: username
    }

    return this.http.post('http://localhost:4000/firm/getIdentifierNumber', data);
  }
}
