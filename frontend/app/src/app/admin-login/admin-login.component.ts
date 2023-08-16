import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private router: Router) { }

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
    this.adminService.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value).subscribe((user: User) => {
        if (user == null){
          this.error = 'Ne postoji korisnik sa zadatim kredencijalima!'
        }
        else {
          localStorage.setItem('user', JSON.stringify(user));
          if (user.username == "admin"){
            this.router.navigate(['admin']).then(() => {
              window.location.reload();
            });
          }
        }
      })
  }

  error: String = '';
}
