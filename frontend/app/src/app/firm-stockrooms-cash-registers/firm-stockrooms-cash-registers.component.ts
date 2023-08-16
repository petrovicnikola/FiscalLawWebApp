import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CashRegister } from '../models/cash_register';
import { Stockroom } from '../models/stockroom';
import { User } from '../models/user';
import { FirmService } from '../services/firm.service';

@Component({
  selector: 'app-firm-stockrooms-cash-registers',
  templateUrl: './firm-stockrooms-cash-registers.component.html',
  styleUrls: ['./firm-stockrooms-cash-registers.component.css']
})
export class FirmStockroomsCashRegistersComponent implements OnInit {

  constructor(private firmService: FirmService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.firmService.getStockrooms(this.user.username).subscribe((stockrooms: Stockroom[])=> {
        this.stockrooms = stockrooms;
      })

      this.firmService.getCashRegisters(this.user.username).subscribe((cashRegisters: CashRegister[]) => {
        this.cashRegisters = cashRegisters;
      })

    } 
  }

  update(sr: Stockroom){
    localStorage.setItem('stockroom', JSON.stringify(sr));
    this.router.navigate(['firm/edit-stockroom']);
  }

  delete(sr: Stockroom){
    console.log(sr._id);
    this.firmService.deleteStockroom(this.user.username, sr._id, sr.name).subscribe((res) => {
      window.location.reload();
    })
  }

  deleteCashRegister(cr: CashRegister){
    let newCashRegisters = [];
    this.cashRegisters.forEach(cashRegister => {
      if (cashRegister.city != cr.city || cashRegister.country != cr.country || cashRegister.zipCode != cr.zipCode ||
        cashRegister.streetAndNumber != cr.streetAndNumber || cashRegister.cashRegisterType != cr.cashRegisterType){
          newCashRegisters.push(cashRegister);
      }
    });
    this.firmService.deleteCashRegister(this.user.username, newCashRegisters).subscribe((user: User) => {
      if (user != null){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        window.location.reload();
      }
    })
  }

  updateCashRegister(cr: CashRegister){
    localStorage.setItem('cashRegister', JSON.stringify(cr));
    localStorage.setItem('cashRegisters', JSON.stringify(this.cashRegisters));
    this.router.navigate(['firm/edit-cash-register']);
  }

  private user: User = null;
  stockrooms: Stockroom[];

  cashRegisters: CashRegister[];
}
