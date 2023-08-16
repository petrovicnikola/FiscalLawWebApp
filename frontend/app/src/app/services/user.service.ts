import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updatePassword(username, password, newPassword){
    const data = {
      username: username,
      password: password,
      newPassword: newPassword
    }

    return this.http.post('http://localhost:4000/users/updatePassword', data);
  }

  updateData(username, isShop, inPDV, codes, bankAccounts, cashRegisters, stockrooms){
    const data = {
      username: username,
      isShop: isShop,
      inPDV: inPDV,
      codes: codes,
      bankAccounts: bankAccounts,
      cashRegisters: cashRegisters,
      stockrooms: stockrooms
    }

    return this.http.post('http://localhost:4000/users/updateData', data);
  }

  getUser(username){
    const data = {
      username: username
    };

    return this.http.post('http://localhost:4000/users/getUser', data);
  }
}
