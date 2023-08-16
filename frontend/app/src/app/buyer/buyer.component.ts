import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((res: User[]) => {
      res.forEach(firm => {
        if (firm.status == 'accepted')
          this.firms.push(firm);
      });
    })
  }

  showArticles(firm: User){
    localStorage.setItem('firm', JSON.stringify(firm));
    this.router.navigate(['buyer/firm-products'])
  }

  firms: User[] = [];
}
