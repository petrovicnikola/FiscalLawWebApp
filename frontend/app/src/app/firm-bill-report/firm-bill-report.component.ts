import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bill';
import { User } from '../models/user';
import { FirmService } from '../services/firm.service';

@Component({
  selector: 'app-firm-bill-report',
  templateUrl: './firm-bill-report.component.html',
  styleUrls: ['./firm-bill-report.component.css']
})
export class FirmBillReportComponent implements OnInit {

  constructor(private firmService: FirmService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));

      this.firmService.getAllBills(this.user.username).subscribe((bills: Bill[]) => {
        this.bills = bills;
      })
    }
  }

  setBill(bill: Bill){
    this.bill = bill;
  }

  bill: Bill = null;
  bills: Bill[] = [];
  user: User = null;
}
