import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-new-firm',
  templateUrl: './admin-new-firm.component.html',
  styleUrls: ['./admin-new-firm.component.css']
})
export class AdminNewFirmComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    surname: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))]],
    passwordConfirmed: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    firmName: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(11)]],
    id: ['', Validators.required], // MATICNI BROJ PREDUZECA, SAMO BROJEVI ??? 
    pib: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]], // DODAJ DA SU SAMO CIFRE I NE MOZE 0 PRVA
    country: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', [Validators.required]], // DODATI DA MOZE SAMO BROJEVI
    streetAndNumber: ['', Validators.required]
  })

  addNewFirm(){
    this.error = '';
    if (this.registrationForm.invalid){
      this.error = 'Neispravno uneti podaci!';
      return;
    }

    this.adminService.registerNewFirm(
      this.registrationForm.controls['name'].value,
      this.registrationForm.controls['surname'].value,
      this.registrationForm.controls['username'].value,
      this.registrationForm.controls['password'].value,
      this.registrationForm.controls['email'].value,
      this.registrationForm.controls['firmName'].value,
      this.registrationForm.controls['phoneNumber'].value,
      this.registrationForm.controls['id'].value,
      this.registrationForm.controls['pib'].value,
      this.registrationForm.controls['country'].value,
      this.registrationForm.controls['city'].value,
      this.registrationForm.controls['zipCode'].value,
      this.registrationForm.controls['streetAndNumber'].value
    ).subscribe((res) => {
      if (res['msg'] == 'usernameErr')
        this.error = "Zauzeto korisnicko ime!";
      else if (res['msg'] == 'emailErr')
        this.error = "Zauzet email";
      else if (res['msg'] == 'pibErr')
        this.error = "Zauzet pib";
      else if (res['msg'] == 'ok')
        alert("Preduzece uspesno dodato!");
    });

  }

  error: string = '';
}
