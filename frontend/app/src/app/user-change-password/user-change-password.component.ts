import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null)
      this.user = JSON.parse(localStorage.getItem('user'));
  }

  updatePasswordForm = this.formBuilder.group({
    password: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))]],
    newPasswordConfirmed: ['', Validators.required]
  })
  

  updatePassword(){
    this.error = '';
    this.success = '';
    if (this.updatePasswordForm.invalid){
      this.error = 'Forma neispravno popunjena!';
      return;
    }
    if (this.updatePasswordForm.controls['newPassword'].value != this.updatePasswordForm.controls['newPasswordConfirmed'].value){
      this.error = 'Lozinka i potvrda lozinke se razlikuju!';
      return;
    }

    this.userService.updatePassword(
      this.user.username,
      this.updatePasswordForm.controls['password'].value,
      this.updatePasswordForm.controls['newPassword'].value).subscribe((res) => {
        if (res['message'] == 'passwordErr')
          this.error = 'Pogresna lozinka!';
        else
          this.success = 'Uspesna promena lozinke!';
          this.logout();
      });
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });   
  }

  user: User = null;
  error: string = '';
  success: string = '';
}
