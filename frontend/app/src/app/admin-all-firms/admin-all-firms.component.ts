import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-all-firms',
  templateUrl: './admin-all-firms.component.html',
  styleUrls: ['./admin-all-firms.component.css']
})
export class AdminAllFirmsComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((users: User[]) => {
      this.firms = users;
    })
  }

  updateStatus(status, username){
    this.adminService.updateStatus(status, username).subscribe((res) => {
      window.location.reload();
    });
  }


  firms: User[] = [];
}
