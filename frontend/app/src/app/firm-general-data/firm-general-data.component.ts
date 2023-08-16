import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { User } from '../models/user';
import { FirmService } from '../services/firm.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-firm-general-data',
  templateUrl: './firm-general-data.component.html',
  styleUrls: ['./firm-general-data.component.css']
})
export class FirmGeneralDataComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private firmService: FirmService, private userService: UserService) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));

      this.generalInfoForm.setValue({
        name: this.user.name.toString(),
        surname:this.user.surname.toString(),
        email: this.user.email.toString(),
        phoneNumber: this.user.phoneNumber.toString(),
        firmName: this.user.firmName.toString(),
        id: this.user.id.toString(),
        pib: this.user.pib.toString(),
        country: this.user.country.toString(),
        city: this.user.city.toString(),
        zipCode: this.user.zipCode.toString(),
        streetAndNumber: this.user.streetAndNumber.toString(),
        inPDV: this.user.inPDV == true ? true: false,
        isShop: this.user.isShop  == true ? true : false,
        codes: this.user.codes
      });

      this.inPDV = this.user.inPDV == true ? true: false;
      this.isShop = this.user.isShop == true ? true: false;
      
      this.generalInfoForm.disable();
    }
  }

  generalInfoForm = this.formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    firmName: ['', Validators.required],
    id: ['', Validators.required],
    pib: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    streetAndNumber: ['', Validators.required],
    inPDV: [true, Validators.required],
    isShop: [true, Validators.required],
    codes: [[], Validators.required]
  });

  edit(finishButton: MatButton, editButton: MatButton){
    finishButton.disabled = false;
    editButton.disabled = true;
    this.generalInfoForm.enable();

  }

  finish(finishButton: MatButton, editButton: MatButton){
    if (this.generalInfoForm.invalid){
      this.error = 'Neispravno uneti podaci! Ukoliko zelite stare podatke, osvezite stranicu.'
      return;
    }

    this.firmService.updateFirmData(this.user.username, 
      this.generalInfoForm.controls['name'].value,
      this.generalInfoForm.controls['surname'].value,
      this.generalInfoForm.controls['email'].value,
      this.generalInfoForm.controls['phoneNumber'].value,
      this.generalInfoForm.controls['firmName'].value,
      this.generalInfoForm.controls['id'].value,
      this.generalInfoForm.controls['pib'].value,
      this.generalInfoForm.controls['country'].value,
      this.generalInfoForm.controls['city'].value,
      this.generalInfoForm.controls['zipCode'].value,
      this.generalInfoForm.controls['streetAndNumber'].value,
      this.generalInfoForm.controls['inPDV'].value,
      this.generalInfoForm.controls['isShop'].value,
      this.generalInfoForm.controls['codes'].value).subscribe((res) => {
        if (res['message'] == 'ok'){
          this.userService.getUser(this.user.username).subscribe((user: User) => {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(this.user));
            window.location.reload();
            finishButton.disabled = true;
            editButton.disabled = false;
            this.generalInfoForm.disable();
          })
        }
      })




  }

  user: User = null;
  inPDV = false;
  isShop = false;
  error: string = '';
}
