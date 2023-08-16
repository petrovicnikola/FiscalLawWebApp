import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BankAccount } from '../models/bank_account';
import { CashRegister } from '../models/cash_register';
import { Stockroom } from '../models/stockroom';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-firm-first-login',
  templateUrl: './firm-first-login.component.html',
  styleUrls: ['./firm-first-login.component.css']
})
export class FirmFirstLoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null)
      this.user = JSON.parse(localStorage.getItem('user'));
  }

  infoForm = this.formBuilder.group({
    isShop: [true, Validators.required],
    codes: [[], Validators.required],
    inPDV: [true, Validators.required]
  })

  bankAccountForm = this.formBuilder.group({
    bankAccountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{3}-[0-9]{12}-[0-9]{2}$/)]], 
    bankName: ['', Validators.required]
  })

  stockroomForm = this.formBuilder.group({
    name: ['', Validators.required]
  })

  cashRegisterForm = this.formBuilder.group({
    country:['', Validators.required],
    city: ['', Validators.required],
    streetAndNumber: ['', Validators.required],
    zipCode: ['', Validators.required],
    cashRegisterType: ['', Validators.required]
  })


  addBankAccount(){
    this.errorBankAccount = "";
    if (this.bankAccountForm.invalid){
      this.errorBankAccount = "Neispravno popunjena forma!";
      return;
    }
    let bankAccount = new BankAccount();
    bankAccount.bankAccountNumber = this.bankAccountForm.controls['bankAccountNumber'].value;
    bankAccount.bankName = this.bankAccountForm.controls['bankName'].value;
    bankAccount.username = this.user.username;

    this.bankAccounts.push(bankAccount);
    this.infoBankAccount = "Dodato: " + this.bankAccounts.length + " racuna.";
  }

  addStockroom(){
    this.errorStockroom = '';
    if (this.stockroomForm.invalid){
      this.errorBankAccount = "Neispravno popunjena forma!";
      return;
    }
    let stockroom = new Stockroom();
    stockroom.name = this.stockroomForm.controls['name'].value;
    stockroom.username = this.user.username;
    this.stockrooms.push(stockroom);
    this.infoStockroom = "Dodato: " + this.stockrooms.length + " magacina.";
  }

  addCashRegister(){
    this.errorCashRegister = '';
    this.errorData = '';
    if (this.cashRegisterForm.invalid){
      this.errorCashRegister= "Neispravno popunjena forma!";
      return;
    }
    let cashRegister = new CashRegister();
    cashRegister.city = this.cashRegisterForm.controls['city'].value;
    cashRegister.country = this.cashRegisterForm.controls['country'].value;
    cashRegister.streetAndNumber = this.cashRegisterForm.controls['streetAndNumber'].value;
    cashRegister.zipCode = this.cashRegisterForm.controls['zipCode'].value;
    cashRegister.cashRegisterType = this.cashRegisterForm.controls['cashRegisterType'].value;
    cashRegister.username = this.user.username;

    this.cashRegisters.push(cashRegister);
    this.infoCashRegister = "Dodato " + this.cashRegisters.length + " kasa.";
  }

  finish(){
    this.errorFinish = '';
    if (this.infoForm.invalid){
      this.errorData = 'Neispravno popunjena forma!';
      this.errorFinish = 'Opsti podaci nisu uneti!';
      return;
    }
    
    if (this.bankAccounts.length == 0){
      this.errorFinish = 'Morate dodati barem jedan ziro racun!';
      return;
    }
    if (this.stockrooms.length == 0){
      this.errorFinish = 'Morate dodati barem jedan magacin!';
      return;
    }
    if (this.cashRegisters.length == 0){
      this.errorFinish = 'Morate dodati barem jednu kasu!';
      return;
    }

    this.userService.updateData(this.user.username,
      this.infoForm.controls['isShop'].value,
      this.infoForm.controls['inPDV'].value,
      this.infoForm.controls['codes'].value,
      this.bankAccounts,
      this.cashRegisters,
      this.stockrooms).subscribe((res) => {
        if (res['message'] == 'ok'){
          this.userService.getUser(this.user.username).subscribe((user: User) => {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['firm']).then(() => {
              window.location.reload();
            })
          })

        }
      })

  }

  errorData: string = '';
  errorBankAccount: string = '';
  errorStockroom: string = '';
  errorCashRegister: string = '';
  
  infoBankAccount: string = '';
  infoStockroom: string = '';
  infoCashRegister: string = '';

  errorFinish: string = "";

  bankAccounts: Array<BankAccount> = [];
  stockrooms: Array<Stockroom> = [];
  cashRegisters: Array<CashRegister> = [];
  user: User = null;
}
