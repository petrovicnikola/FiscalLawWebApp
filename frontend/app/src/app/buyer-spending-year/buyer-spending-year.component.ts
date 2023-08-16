import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bill';
import { User } from '../models/user';
import { BuyerService } from '../services/buyer.service';

@Component({
  selector: 'app-buyer-spending-year',
  templateUrl: './buyer-spending-year.component.html',
  styleUrls: ['./buyer-spending-year.component.css']
})
export class BuyerSpendingYearComponent implements OnInit {

  single: any[] = single;
  constructor(private buyerService: BuyerService) { 
    Object.assign(this,  this.single)
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));

      single.forEach(element => {
        element.value = 0;
      });

      this.single = [...single];

      this.buyerService.getBillsForBuyer(this.user.identifierNumber).subscribe((bills: Bill[]) => {
        this.bills = bills;
        let now: Date = new Date();

        this.bills.forEach(bill => {
          let billDate: Date = (new Date(bill.date));
          if (billDate.getFullYear() == now.getFullYear()){
            single[billDate.getMonth()].value = single[billDate.getMonth()].value + bill.toPay.valueOf();
          }
        });
        this.single = [...single]
      })
    }
  }


  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Mesec';
  showYAxisLabel = true;
  yAxisLabel = 'Potrosnja';



  user: User = null;
  bills: Bill[] = [];
}


var single = [
  {
    "name" : "Januar",
    "value" : 0
  },
  {
    "name" : "Februar",
    "value" : 0
  },
  {
    "name" : "Mart",
    "value" : 0
  },
  {
    "name" : "April",
    "value" : 0
  },
  {
    "name" : "Maj",
    "value" : 0
  },
  {
    "name" : "Jun",
    "value" : 0
  },
  {
    "name" : "Jul",
    "value" : 0
  },
  {
    "name" : "Avgust",
    "value" : 0
  },
  {
    "name" : "Septembar",
    "value" : 0
  },
  {
    "name" : "Oktobar",
    "value" : 0
  },
  {
    "name" : "Novembar",
    "value" : 0
  },
  {
    "name" : "Decembar",
    "value" : 0
  }
]