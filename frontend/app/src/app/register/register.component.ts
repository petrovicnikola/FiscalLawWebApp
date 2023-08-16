import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) { }

  ngOnInit(): void {
  }

//^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})
//
  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    surname: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"))]],
    passwordConfirmed: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    firmName: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(11), Validators.pattern(new RegExp("^(?=.*[0-9])[0-9*]{9,11}$"))]],
    id: ['', Validators.required], 
    pib: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(new RegExp("^(?=[1-9])(?=.*[0-9])[0-9*]{9,11}$"))]], 
    country: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern(new RegExp("^(?=.*[0-9])[0-9*]{3,11}$"))]], 
    streetAndNumber: ['', Validators.required]
  })

  register(): void {
    this.error = '';
    if (this.registrationForm.controls["name"].hasError("required") || 
    this.registrationForm.controls["surname"].hasError("required") ||
    this.registrationForm.controls["username"].hasError("required") || 
    this.registrationForm.controls["password"].hasError("required") || 
    this.registrationForm.controls["passwordConfirmed"].hasError("required") || 
    this.registrationForm.controls["email"].hasError("required") || 
    this.registrationForm.controls["firmName"].hasError("required") || 
    this.registrationForm.controls["phoneNumber"].hasError("required") || 
    this.registrationForm.controls["id"].hasError("required") ||
    this.registrationForm.controls["pib"].hasError("required") ||
    this.registrationForm.controls["country"].hasError("required") ||
    this.registrationForm.controls["city"].hasError("required") ||
    this.registrationForm.controls["zipCode"].hasError("required") ||
    this.registrationForm.controls["streetAndNumber"].hasError("required")){
      return;
    }

    if (this.registrationForm.controls['password'].value != this.registrationForm.controls['passwordConfirmed'].value){
      this.error = "Lozinka i ponovljena lozinka se razlikuju!";
      return;
    }

    this.registrationService.register(this.registrationForm.controls['name'].value,
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
    this.registrationForm.controls['streetAndNumber'].value,
    this.file).subscribe(res => {
      if (res['message'] == 'ok'){
        this.error = "Uspesna registracija! Admin ce uskoro proveriti vas zahtev.";
      }else if (res['message'] == 'usernameErr') {
        this.error = 'Korisnicko ime je zauzeto!';
      }
      else if (res['message'] == 'emailErr'){
        this.error = 'Nalog sa datom email adresom vec postoji!';
      }
      else {
        this.error = "Greska pri registraciji!";
      }
    })

  }

  onFileChanged(event){
    this.file = event.target.files[0];
    var reader = new FileReader()
    console.log(this.file)
    reader.readAsDataURL(this.file)
    reader.onload = (e) =>{
      var img = new Image()
      img.onload = () =>{
        if (img.width < 100 || img.width > 300 || img.height < 100 || img.width > 300){
          alert("Slika mora imati dimenzije izmedju 100 i 300 px")
        }
        else{
          this.file = event.target.files[0];
        }
      }
    }
  }

  onUpload(){
    this.register();
  }

  error: String = '';
  file: File;
}
