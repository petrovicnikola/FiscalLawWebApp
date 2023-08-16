import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getNonVerifiedUsers().subscribe((users: User[]) => {
      this.userRequests = users;
    })
  }

  updateStatus(status, username){
    this.adminService.updateStatus(status, username).subscribe((res) => {
      window.location.reload();
    });
  }

  userRequests: User[];

}
