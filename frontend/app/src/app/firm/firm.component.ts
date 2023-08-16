import { LOCATION_INITIALIZED } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-firm',
  templateUrl: './firm.component.html',
  styleUrls: ['./firm.component.css']
})
export class FirmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));

      this.imgSrc = 'http://localhost:4000/uploads/' + this.user.username;
    }
  }


  user: User = null;
  imgSrc: String;

}
