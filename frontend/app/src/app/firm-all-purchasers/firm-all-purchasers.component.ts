import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { FirmService } from '../services/firm.service';

@Component({
  selector: 'app-firm-all-purchasers',
  templateUrl: './firm-all-purchasers.component.html',
  styleUrls: ['./firm-all-purchasers.component.css']
})
export class FirmAllPurchasersComponent implements OnInit {

  constructor(private firmService: FirmService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.user.purchasers.forEach(pib => {
        this.firmService.getPurchaser(pib).subscribe((user: User) => {
          this.purchasers.push(user);
        })
      })
    }
  }



  purchasers: User[] = [];
  user: User = null;
}
