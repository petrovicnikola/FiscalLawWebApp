import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bill';
import { FirmService } from '../services/firm.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor(private firmService: FirmService) { }

  ngOnInit(): void {
    this.firmService.getBills().subscribe((bills: Bill[])=> {
      this.unsorted = bills;
      this.bills = this.unsorted.sort((a, b) => 
         (new Date(b.date)).getTime() - (new Date(a.date)).getTime()
      )
    })
  }


  unsorted: Bill[] = []
  bills: Bill[] = [];
}
