import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }


  register(name, surname, username, password, email, firmName, phoneNumber, id, pib, country, city, zipCode, streetAndNumber, file){
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('firmName', firmName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('id', id);
    formData.append('pib', pib);
    formData.append('country', country);
    formData.append('city', city);
    formData.append('zipCode', zipCode);
    formData.append('streetAndNumber', streetAndNumber);
    formData.append('img', file);
    formData.append('picture', '');
    /*const data = {
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
      file: file
    }*/
    console.log(file);
    return this.http.post('http://localhost:4000/users/register', formData);
  }

  registerPurchaser(name, surname, username, password, email, firmName, phoneNumber, id, pib, country, city, zipCode, streetAndNumber,
    daysToPay, rabat){
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
      daysToPay: daysToPay,
      rabat: rabat
    }

    return this.http.post('http://localhost:4000/users/registerPurchaser', data);
  }
}
