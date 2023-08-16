import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Bill } from '../models/bill';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';
import { FirmService } from '../services/firm.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-daily-reports',
  templateUrl: './admin-daily-reports.component.html',
  styleUrls: ['./admin-daily-reports.component.css']
})
export class AdminDailyReportsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private firmService: FirmService,
    private adminService: AdminService) { }


  ngOnInit(): void {
  }


  searchForm = this.formBuilder.group({
    firmName: [''],
    pib: [''],
    dateFrom: [new Date, Validators.required],
    dateTo: [new Date, Validators.required]
  })

  findFirmBalances(){
    if (this.searchForm.invalid)
      return;
    let dateFrom: Date  = this.searchForm.controls['dateFrom'].value;
    let dateTo:Date  = this.searchForm.controls['dateTo'].value;
    let firmName: string = this.searchForm.controls['firmName'].value;
    let pib: string = this.searchForm.controls['pib'].value;
    this.firmsAndBalances = [];

    if (pib != '' && firmName  == ''){
      this.firmService.findFirmWithPIB(this.searchForm.controls['pib'].value).subscribe((firm: User) => {
        if (firm != null){
          this.firmService.getAllBills(firm.username).subscribe((bills: Bill[]) => {
            let income: number = 0;
            let tax: number = 0;

            bills.forEach(bill => {
              let billDate: Date = new Date(bill.date);
              if ( dateFrom <= billDate && dateTo>= billDate){
                income += bill.toPay.valueOf();
                tax += bill.inTaxes.valueOf();
              }
            });

            this.firmsAndBalances.push(new FirmBalance(firm, income, tax));
          })
        }
      })
    } else if (pib != '' && firmName != ''){
      this.firmService.findFirmWithPIB(this.searchForm.controls['pib'].value).subscribe((firm: User) => {
        if (firm != null && firm.firmName.includes(firmName)){
          this.firmService.getAllBills(firm.username).subscribe((bills: Bill[]) => {
            let income: number = 0;
            let tax: number = 0;

            bills.forEach(bill => {
              let billDate: Date = new Date(bill.date);
              if ( dateFrom <= billDate && dateTo>= billDate){
                income += bill.toPay.valueOf();
                tax += bill.inTaxes.valueOf();
              }
            });

            this.firmsAndBalances.push(new FirmBalance(firm, income, tax));
          })
        }
      })
    } else if (pib == '' && firmName != ''){
      this.adminService.getAllUsers().subscribe((firms: User[]) => {
        firms.forEach(firm => {
          if (firm.firmName != null && firm.firmName.includes(firmName)){
            this.firmService.getAllBills(firm.username).subscribe((bills: Bill[]) => {
              let income: number = 0;
              let tax: number = 0;
  
              bills.forEach(bill => {
                let billDate: Date = new Date(bill.date);
                if ( dateFrom <= billDate && dateTo>= billDate){
                  income += bill.toPay.valueOf();
                  tax += bill.inTaxes.valueOf();
                }
              });
  
              this.firmsAndBalances.push(new FirmBalance(firm, income, tax));
            })
          }
        });
      })
    } else if (pib == '' && firmName == ''){
      this.adminService.getAllUsers().subscribe((firms: User[]) => {
        firms.forEach(firm => {
          this.firmService.getAllBills(firm.username).subscribe((bills: Bill[]) => {
            let income: number = 0;
            let tax: number = 0;

            bills.forEach(bill => {
              let billDate: Date = new Date(bill.date);
              if ( dateFrom <= billDate && dateTo>= billDate){
                income += bill.toPay.valueOf();
                tax += bill.inTaxes.valueOf();
              }
            });

            this.firmsAndBalances.push(new FirmBalance(firm, income, tax));
          })
        });
      })
    }
    
  }

  firmsAndBalances: FirmBalance[] = [];
}

class FirmBalance{
  firm: User;
  income: Number;
  tax: Number;

  constructor(firm, income, tax){
    this.firm = firm;
    this.income = income;
    this.tax = tax;
  }
}