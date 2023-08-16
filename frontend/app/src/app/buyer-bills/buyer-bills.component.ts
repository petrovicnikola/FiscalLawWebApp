import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bill } from '../models/bill';
import { User } from '../models/user';
import { BuyerService } from '../services/buyer.service';

@Component({
  selector: 'app-buyer-bills',
  templateUrl: './buyer-bills.component.html',
  styleUrls: ['./buyer-bills.component.css']
})
export class BuyerBillsComponent implements OnInit {

  constructor(private buyerService: BuyerService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log(this.user.identifierNumber)
      this.buyerService.getBillsForBuyer(this.user.identifierNumber).subscribe((bills: Bill[]) => {
        this.bills = bills;
      })
    }
  }

  details(bill: Bill){
    localStorage.setItem('billDetails', JSON.stringify(bill));
    this.router.navigate(['buyer/bill-details']);
  }

  bills: Bill[] = [];
  user: User = null;
  identifierNumber: string = '';
}
