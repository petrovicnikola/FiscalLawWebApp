import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bill';

@Component({
  selector: 'app-buyer-bill-details',
  templateUrl: './buyer-bill-details.component.html',
  styleUrls: ['./buyer-bill-details.component.css']
})
export class BuyerBillDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('billDetails') != null){
      this.bill = JSON.parse(localStorage.getItem('billDetails'));
    }
  }


  bill: Bill = null;
}
