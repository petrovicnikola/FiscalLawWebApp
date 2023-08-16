import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bindCallback } from 'rxjs';
import { FirmBankAccountsComponent } from '../firm-bank-accounts/firm-bank-accounts.component';
import { BankAccount } from '../models/bank_account';
import { FirmService } from '../services/firm.service';

@Component({
  selector: 'app-firm-edit-bank-account',
  templateUrl: './firm-edit-bank-account.component.html',
  styleUrls: ['./firm-edit-bank-account.component.css']
})
export class FirmEditBankAccountComponent implements OnInit {

  constructor(private firmService: FirmService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.bankAccount = JSON.parse(localStorage.getItem('bankAccount'));
    this.bankAccounts = JSON.parse(localStorage.getItem('bankAccounts'));

    this.bankAccForm.setValue({
      bankAccountNumber: this.bankAccount.bankAccountNumber.toString(),
      bankName: this.bankAccount.bankName.toString()
    })
  }

  bankAccForm = this.formBuilder.group({
    bankAccountNumber: ['', Validators.required],
    bankName: ['', Validators.required]
  })


  back(){
    localStorage.removeItem('bankAccount');
    localStorage.removeItem('bankAccounts');
    this.router.navigate(['firm/bank-accounts']);
  }

  update(){
    this.error = '';
    if (this.bankAccForm.invalid){
      this.error = 'Neispravno uneti podaci';
      return;
    }
    let newBankName = this.bankAccForm.controls['bankName'].value;
    let newBankAccountNumber = this.bankAccForm.controls['bankAccountNumber'].value;

    this.bankAccounts.forEach(ba => {
      if (ba.bankName == this.bankAccount.bankName && ba.bankAccountNumber == this.bankAccount.bankAccountNumber){
        ba.bankName = newBankName;
        ba.bankAccountNumber = newBankAccountNumber;
      }
    });
    this.firmService.deleteBankAccount(this.bankAccount.username, this.bankAccounts).subscribe((res) => {
      localStorage.removeItem('bankAccount');
      localStorage.removeItem('bankAccounts');
      this.router.navigate(['firm/bank-accounts']).then(() => {
        window.location.reload();
      })
    })
  } 

  private bankAccount: BankAccount;
  private bankAccounts: BankAccount[];
  error: string = "";
}
