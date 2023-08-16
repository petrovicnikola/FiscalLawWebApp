import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { yearsPerRow } from '@angular/material/datepicker';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  login(){
    this.error = '';
    if (this.loginForm.controls['username'].hasError('required') || this.loginForm.controls['password'].hasError['required'])
      return;
    this.loginService.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value).subscribe((user: User) => {
        if (user == null){
          this.error = 'Ne postoji korisnik sa zadatim kredencijalima!'
        }
        else if (user.status == 'pending'){
          alert ("Admin jos nije razmotrio vas zahtev za registraciju!");
        }
        else if (user.status == 'rejected'){
          alert ("Admin je odbio vas zahtev za registraciju!");
        }
        else {
          localStorage.setItem('user', JSON.stringify(user));
          if (user.isBuyer == false){
            if (user.firstLogin){
              this.router.navigate(['firm/first/login']).then(() => { 
                window.location.reload();
              })
            }
            else{ 
              this.router.navigate(['firm']).then(() => {
                window.location.reload();
              })
            }
          }
          else if (user.isBuyer == true){
            this.router.navigate(['buyer']).then(() => {
              window.location.reload();
              
            })
          }
        }
      })
  }

  error: String = '';

}
