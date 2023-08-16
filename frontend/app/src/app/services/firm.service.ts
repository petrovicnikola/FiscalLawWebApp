import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccount } from '../models/bank_account';

@Injectable({
  providedIn: 'root'
})
export class FirmService {

  constructor(private http: HttpClient) { }

  updateFirmData(username, name, surname, email, phoneNumber, firmName, id, pib, country, city, zipCode, streetAndNumber, inPDV, isShop, codes){
    const data = {
      username: username,
      name:name,
      surname:surname,
      email:email,
      phoneNumber: phoneNumber,
      firmName: firmName,
      id: id,
      pib: pib,
      country: country,
      city: city,
      zipCode: zipCode,
      streetAndNumber: streetAndNumber,
      inPDV: inPDV,
      isShop: isShop,
      codes: codes
    };

    return this.http.post('http://localhost:4000/firm/updateData', data);
  }

  getBankAccounts(username){
    const data = {
      username: username
    };

    return this.http.post('http://localhost:4000/firm/getBankAccounts', data);
  }

  deleteBankAccount(username, bankAccounts){
    const data = {
      username: username,
      bankAccounts: bankAccounts
    }

    return this.http.post('http://localhost:4000/firm/deleteBankAccount', data);
  }

  getStockrooms(username){
    const data = {
      username: username
    };

    return this.http.post('http://localhost:4000/firm/getStockrooms', data);
  }


  deleteStockroom(username, _id, name){
    const data = {
      username: username,
      _id: _id,
      name: name
    }

    return this.http.post('http://localhost:4000/firm/deleteStockroom', data)
  }

  updateStockroom(username, _id, name, newName){
    const data = {
      username: username,
      _id: _id,
      name: name,
      newName: newName
    }

    return this.http.post('http://localhost:4000/firm/updateStockroom', data);
  }

  getCashRegisters(username){
    const data = {
      username: username
    };

    return this.http.post('http://localhost:4000/firm/getCashRegisters', data);
  }

  deleteCashRegister(username, cashRegisters){
    const data = {
      username: username,
      cashRegisters: cashRegisters
    }

    return this.http.post('http://localhost:4000/firm/deleteCashRegister', data);
  }

  findFirmWithPIB(pib){
    const data = {
      pib: pib
    }

    return this.http.post('http://localhost:4000/firm/findFirmWithPIB', data);
  }

  addNewPurchaser(purchaser, username){
    const data = {
      username: username,
      purchaser: purchaser
    }

    return this.http.post('http://localhost:4000/firm/addNewPurchaser', data)
  }

  getPurchaser(pib){
    const data = {
      pib: pib
    }
    return this.http.post('http://localhost:4000/firm/getPurchaser', data)
  }

  getUserAndPurchasers(username){
    const data = {
      username: username
    }

    return this.http.post('http://localhost:4000/firm/getUserAndPurchasers', data);
  }

  addBill(username, money, identifierNumber, billItems, toPay, inTaxes, buyerName, buyerSurname, slipNumber, purchaser, type, firmName, objectName){
    const data = {
      username: username,
      money: money,
      toPay: toPay,
      inTaxes: inTaxes,
      billItems: billItems,
      identifierNumber: identifierNumber,
      buyerName: buyerName,
      buyerSurname: buyerSurname,
      slipNumber: slipNumber,
      purchaser: purchaser,
      date: new Date(),
      type: type,
      firmName: firmName,
      objectName: objectName
    }

    console.log(purchaser)

    return this.http.post('http://localhost:4000/firm/addNewBill', data);
  }

  getAllBills(username){
    const data = {
      username: username
    }
    
    return this.http.post('http://localhost:4000/firm/getAllBills', data);
  }

  getRooms(username){
    const data = {username: username}

    return this.http.post('http://localhost:4000/firm/getRooms', data);
  }

  addRoom(username, name) {
    const data = {
      username: username,
      name: name
    }

    return this.http.post('http://localhost:4000/firm/addRoom', data);
  }

  updateTables(username, name, tables){
    const data = {
      username: username,
      name: name,
      tables: tables
    }

    return this.http.post('http://localhost:4000/firm/updateTables', data);
  }

  getBills(){
    return this.http.get('http://localhost:4000/firm/getBills');
  }
}
