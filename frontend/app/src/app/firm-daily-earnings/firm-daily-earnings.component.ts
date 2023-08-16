import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Bill } from '../models/bill';
import { User } from '../models/user';
import { FirmService } from '../services/firm.service';

@Component({
  selector: 'app-firm-daily-earnings',
  templateUrl: './firm-daily-earnings.component.html',
  styleUrls: ['./firm-daily-earnings.component.css']
})
export class FirmDailyEarningsComponent implements OnInit {

  constructor(private firmService: FirmService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));

      this.firmService.getAllBills(this.user.username).subscribe((bills: Bill[]) => {
        this.bills = bills;
      })
    }
  }

  showEarnings(){
    console.log(this.date.value.getDay())
    this.bills.forEach(bill => {
      let billDate = new Date(bill.date);
      if (this.sameDates(billDate, this.date.value)){
            this.sum += bill.toPay.valueOf();
            this.tax += bill.inTaxes.valueOf();
          }
    });
    this.show = true;
  }

  sameDates(d1: Date, d2: Date) : boolean {
    if (d1.getDay() == d2.getDay() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear())
      return true;
    return false;
  }

  sum: number = 0;
  tax: number = 0;

  date = new FormControl(new Date());
  user: User = null;
  bills: Bill[] = [];
  show: boolean = false;
}
