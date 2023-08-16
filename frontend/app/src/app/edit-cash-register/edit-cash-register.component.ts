import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirmStockroomsCashRegistersComponent } from '../firm-stockrooms-cash-registers/firm-stockrooms-cash-registers.component';
import { CashRegister } from '../models/cash_register';
import { FirmService } from '../services/firm.service';

@Component({
  selector: 'app-edit-cash-register',
  templateUrl: './edit-cash-register.component.html',
  styleUrls: ['./edit-cash-register.component.css']
})
export class EditCashRegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private firmService: FirmService) { }

  ngOnInit(): void {
    this.cashRegister = JSON.parse(localStorage.getItem('cashRegister'));
    this.cashRegisters = JSON.parse(localStorage.getItem('cashRegisters'));

    this.cashRegisterForm.setValue({
      country: this.cashRegister.country.toString(),
      city: this.cashRegister.city.toString(),
      streetAndNumber: this.cashRegister.streetAndNumber.toString(),
      zipCode: this.cashRegister.zipCode.toString(),
      cashRegisterType: this.cashRegister.cashRegisterType
      .toString()
    })
  }

  cashRegisterForm = this.formBuilder.group({
    country:['', Validators.required],
    city: ['', Validators.required],
    streetAndNumber: ['', Validators.required],
    zipCode: ['', Validators.required],
    cashRegisterType: ['', Validators.required]
  })

  update(){
    this.error = '';
    if (this.cashRegisterForm.invalid){
      this.error = 'Neispravno uneti podaci.';
      return;
    }

    this.cashRegisters.forEach(cr => {
      if (this.cashRegister.city == cr.city && this.cashRegister.country == cr.country&& this.cashRegister.zipCode == cr.zipCode &&
        this.cashRegister.streetAndNumber == cr.streetAndNumber && this.cashRegister.cashRegisterType == cr.cashRegisterType){
          cr.city = this.cashRegisterForm.controls['city'].value;
          cr.country = this.cashRegisterForm.controls['country'].value;
          cr.streetAndNumber = this.cashRegisterForm.controls['streetAndNumber'].value;
          cr.zipCode = this.cashRegisterForm.controls['zipCode'].value;
          cr.cashRegisterType = this.cashRegisterForm.controls['cashRegisterType'].value;
      }
    });

    this.firmService.deleteCashRegister(this.cashRegister.username, this.cashRegisters).subscribe((res) => {
      localStorage.removeItem('cashRegister');
      localStorage.removeItem('cashRegisters');
      this.router.navigate(['firm/stockrooms-cash-registers']).then(() => {
        window.location.reload();
      })
    })
  }

  back(){
    localStorage.removeItem('cashRegister');
    localStorage.removeItem('cashRegisters');
    this.router.navigate(['firm/stockrooms-cash-registers']);
  }

  error: string = '';
  cashRegister: CashRegister;
  cashRegisters: CashRegister[];
}
