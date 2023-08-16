import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { FirmService } from '../services/firm.service';
import { RegistrationService } from '../services/registration.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-firm-new-purchaser',
  templateUrl: './firm-new-purchaser.component.html',
  styleUrls: ['./firm-new-purchaser.component.css']
})
export class FirmNewPurchaserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private firmService: FirmService, private regService: RegistrationService,
    private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.currUser = JSON.parse(localStorage.getItem('user'));
    }
  }

  findPurchaserForm = this.formBuilder.group({
    pib: ['', Validators.required]
  })

  addNewPurchaserForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firmName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    pib: ['', Validators.required],
    id: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    streetAndNumber: ['', Validators.required],
    daysToPay: [0, Validators.required],
    rabat: [0, Validators.required]
  })

  find(){
    this.msg = '';
    if (this.findPurchaserForm.invalid)
      return;
    this.firmService.findFirmWithPIB(this.findPurchaserForm.controls['pib'].value).subscribe((firm: User) => {
      if (firm != null)
        this.user = firm;
      else
        this.msg = 'Ne postoji preduzece sa datim pib-om';
    })
  }

  add(){
    this.firmService.addNewPurchaser(this.user.pib, this.currUser.username).subscribe((res) => {
      if (res['message'] == 'ok'){
        new alert("Narucilac uspesno dodat!");
        this.userService.getUser(this.currUser.username).subscribe((user: User) => {
          localStorage.setItem('user', JSON.stringify(user));
        })
      }
    })
  }

  addNewPurchaser(){
    this.error = '';
    if (this.addNewPurchaserForm.invalid){
      this.error = 'Neispravno popunjena forma!';
      return;
    }
    this.regService.registerPurchaser("", "", "", "", 
    this.addNewPurchaserForm.controls['email'].value,
    this.addNewPurchaserForm.controls['firmName'].value,
    this.addNewPurchaserForm.controls['phoneNumber'].value,
    this.addNewPurchaserForm.controls['id'].value,
    this.addNewPurchaserForm.controls['pib'].value,
    this.addNewPurchaserForm.controls['country'].value,
    this.addNewPurchaserForm.controls['city'].value,
    this.addNewPurchaserForm.controls['zipCode'].value,
    this.addNewPurchaserForm.controls['streetAndNumber'].value,
    this.addNewPurchaserForm.controls['daysToPay'].value,
    this.addNewPurchaserForm.controls['rabat'].value).subscribe((user: User) => {
      this.firmService.addNewPurchaser(user.pib, this.currUser.username).subscribe((res) => {
        if (res['message'] == 'ok'){
          new alert("Narucilac uspesno dodat!");
          this.userService.getUser(this.currUser.username).subscribe((user: User) => {
            localStorage.setItem('user', JSON.stringify(user));
          })
        }
      })
    })
  }


  user: User = null;
  error: string = '';
  currUser: User = null;
  msg: string = '';
}
