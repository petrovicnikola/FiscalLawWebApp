import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillItem } from '../models/bill_item';
import { User } from '../models/user';
import { FirmService } from '../services/firm.service';

@Component({
  selector: 'app-firm-bill-payout',
  templateUrl: './firm-bill-payout.component.html',
  styleUrls: ['./firm-bill-payout.component.css']
})
export class FirmBillPayoutComponent implements OnInit {

  constructor(private firmService: FirmService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.user.purchasers.forEach(purchaser => {
        this.firmService.getPurchaser(purchaser).subscribe((purc: User)=>{
          this.purchasers.push(purc);
        })
      })

    }
    if (localStorage.getItem('billItems') != null){
      this.billItems = JSON.parse(localStorage.getItem('billItems'));
      this.billItems.forEach(billItem => {
        this.toPay += billItem.amount.valueOf() * billItem.sellingPrice.valueOf();
        this.inTaxes += billItem.amount.valueOf() * billItem.sellingPrice.valueOf() * (billItem.product.tax.valueOf() / 100);
      });
    }

    if (localStorage.getItem('objectName') != null){
      this.objectName = localStorage.getItem('objectName');
    }
  }

  choosePayingMethod(s){
    this.payingMethod = s;
    console.log(this.payingMethod);
  }

  onMoneyChange(){
    this.change = this.money.valueOf() - this.toPay;
  }

  addBill(type){
    if (this.purchaser != null){
      this.firmService.addBill(this.user.username,
        this.money,
        this.identifierNumber,
        this.billItems,
        this.toPay,
        this.inTaxes,
        this.buyerName,
        this.buyerSurname,
        this.slipNumber,
        this.purchaser.pib,
        type,
        this.user.firmName,
        this.objectName).subscribe((res) => {
          alert("Uspesno dodat racun!");
          localStorage.removeItem('billItems');
          this.router.navigate(['firm/issue-a-bill'])
        })
    }else {
      this.firmService.addBill(this.user.username,
        this.money,
        this.identifierNumber,
        this.billItems,
        this.toPay,
        this.inTaxes,
        this.buyerName,
        this.buyerSurname,
        this.slipNumber,
        this.purchaser,
        type,
        this.user.firmName,
        this.objectName).subscribe((res) => {
          alert("Uspesno dodat racun!");
          localStorage.removeItem('billItems');
          if (this.user.isShop == true)
            this.router.navigate(['firm/issue-a-bill'])
          else
            this.router.navigate(['firm/issue-a-bill-second'])
        })
    }
  }

  setPurchaser(p: User){
    this.purchaser = p;
  }

  objectName: string = '';

  money: Number = null;
  identifierNumber: String = '';
  slipNumber: String = '';
  change: Number = null;
  buyerName: String = '';
  buyerSurname: String = '';

  billItems: BillItem[] = [];
  toPay: number = 0;
  inTaxes: number = 0;
  payingMethod: string = '';
  user: User = null;

  purchaser: User = null;

  purchasers: User[] = [];
  userWithPurchasers: User = null;
}
