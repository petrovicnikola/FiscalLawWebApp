import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/admin';

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/login`, data);
  }

  getNonVerifiedUsers(){
    return this.http.get(`${this.uri}/getNonVerifiedUsers`);
  }

  updateStatus(status: string, username: string){
    const data = {
      status: status,
      username: username
    };

    return this.http.post(`${this.uri}/updateStatus`, data);
  }

  registerNewFirm(name, surname, username, password, email, firmName, phoneNumber, id, pib, country, city, zipCode, streetAndNumber){
    const data = {
      name: name,
      surname: surname,
      username: username,
      password: password,
      email: email,
      firmName: firmName,
      phoneNumber: phoneNumber, 
      id: id,
      pib: pib,
      country: country,
      city: city,
      zipCode: zipCode,
      streetAndNumber: streetAndNumber,
      status: 'accepted',
      firstLogin: true,
      isBuyer: false
    }

    return this.http.post('http://localhost:4000/admin/registerNewFirm', data);
  }

  getAllUsers(){
    return this.http.get('http://localhost:4000/admin/getAllUsers');
  }

  registerNewBuyer(name, surname, username, password, phoneNumber, identifierNumber){
    const data = {
      name: name,
      surname: surname,
      username:username,
      password: password,
      phoneNumber: phoneNumber,
      isBuyer: true,
      status: 'accepted',
      firstLogin: false,
      identifierNumber: identifierNumber
    }

    return this.http.post('http://localhost:4000/admin/registerNewBuyer', data);
  }
}
