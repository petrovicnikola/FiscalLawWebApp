import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankAccount } from '../models/bank_account';
import { User } from '../models/user';
import { FirmService } from '../services/firm.service';

@Component({
  selector: 'app-firm-bank-accounts',
  templateUrl: './firm-bank-accounts.component.html',
  styleUrls: ['./firm-bank-accounts.component.css']
})
export class FirmBankAccountsComponent implements OnInit {

  constructor(private firmService: FirmService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.firmService.getBankAccounts(this.user.username).subscribe((bankAccounts: BankAccount[]) => {
        this.bankAccounts = bankAccounts;
      })
    }
  }

  delete(ba: BankAccount){
    let newBankAccounts = [];
    this.bankAccounts.forEach(bankAccount => {
      if (bankAccount.bankAccountNumber != ba.bankAccountNumber || bankAccount.bankName != ba.bankName){
        newBankAccounts.push(bankAccount);
      }
    });
    this.firmService.deleteBankAccount(this.user.username, newBankAccounts).subscribe((user: User) => {
      if (user != null){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        window.location.reload();
      }
    })
  }

  update(ba: BankAccount){
    localStorage.setItem('bankAccount', JSON.stringify(ba));
    localStorage.setItem('bankAccounts', JSON.stringify(this.bankAccounts));
    this.router.navigate(['firm/edit-bank-account']);
  }

  user: User = null;
  bankAccounts: Array<BankAccount> = [];
}
