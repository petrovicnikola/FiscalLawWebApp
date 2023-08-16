import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-new-buyer',
  templateUrl: './admin-new-buyer.component.html',
  styleUrls: ['./admin-new-buyer.component.css']
})
export class AdminNewBuyerComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    surname: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))]],
    passwordConfirmed: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    identifierNumber: ['', Validators.required]
  })


  addNewBuyer(){
    this.error = '';
    if (this.registrationForm.invalid){
      this.error = 'Neispravno popunjena forma!';
      return;
    }
    if (this.registrationForm.controls['password'].value != this.registrationForm.controls['passwordConfirmed'].value){
      this.error = 'Lozinka i potvrda se ne poklapaju!';
      return;
    }


    this.adminService.registerNewBuyer(this.registrationForm.controls['name'].value,
    this.registrationForm.controls['surname'].value,
    this.registrationForm.controls['username'].value,
    this.registrationForm.controls['password'].value,
    this.registrationForm.controls['phoneNumber'].value,
    this.registrationForm.controls['identifierNumber'].value).subscribe((res) => {
      if (res['msg'] == 'usernameErr')
        this.error = 'Zauzeto korisnicko ime'!;
      else if (res['msg'] == 'ok')
        alert("Uspesno dodat kupac!");
    })

  }


  error: string = '';
}
