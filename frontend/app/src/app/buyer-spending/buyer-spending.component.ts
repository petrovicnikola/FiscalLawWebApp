import { Component, OnInit, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Bill } from '../models/bill';
import { User } from '../models/user';
import { BuyerService } from '../services/buyer.service';

@Component({
  selector: 'app-buyer-spending',
  templateUrl: './buyer-spending.component.html',
  styleUrls: ['./buyer-spending.component.css']
})
export class BuyerSpendingComponent implements OnInit {
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
          if (billDate.getMonth() == now.getMonth()){
            single[billDate.getDate()].value = single[billDate.getDate()].value + bill.toPay.valueOf();
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
  xAxisLabel = 'Dan';
  showYAxisLabel = true;
  yAxisLabel = 'Potrosnja';



  user: User = null;
  bills: Bill[] = [];
}

var single = [
  {
    "name" : "1",
    "value" : 0
  },
  {
    "name" : "2",
    "value" : 0
  },
  {
    "name" : "3",
    "value" : 0
  },
  {
    "name" : "4",
    "value" : 0
  },
  {
    "name" : "5",
    "value" : 0
  },
  {
    "name" : "6",
    "value" : 0
  },
  {
    "name" : "7",
    "value" : 0
  },
  {
    "name" : "8",
    "value" : 0
  },
  {
    "name" : "9",
    "value" : 0
  },
  {
    "name" : "10",
    "value" : 0
  },
  {
    "name" : "11",
    "value" : 0
  },
  {
    "name" : "12",
    "value" : 0
  },
  {
    "name" : "13",
    "value" : 0
  },
  {
    "name" : "14",
    "value" : 0
  },
  {
    "name" : "15",
    "value" : 0
  },
  {
    "name" : "16",
    "value" : 0
  },
  {
    "name" : "17",
    "value" : 0
  },
  {
    "name" : "18",
    "value" : 0
  },
  {
    "name" : "19",
    "value" : 0
  },
  {
    "name" : "20",
    "value" : 0
  },
  {
    "name" : "21",
    "value" : 0
  },
  {
    "name" : "22",
    "value" : 0
  },
  {
    "name" : "23",
    "value" : 0
  },
  {
    "name" : "24",
    "value" : 0
  },
  {
    "name" : "25",
    "value" : 0
  },
  {
    "name" : "26",
    "value" : 0
  },
  {
    "name" : "27",
    "value" : 0
  },
  {
    "name" : "28",
    "value" : 0
  },
  {
    "name" : "29",
    "value" : 0
  },
  {
    "name" : "30",
    "value" : 0
  },
  {
    "name" : "31",
    "value" : 0
  }

]