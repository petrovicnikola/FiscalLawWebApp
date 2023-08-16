import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirmBillProductAmountComponent } from '../firm-bill-product-amount/firm-bill-product-amount.component';
import { BillItem } from '../models/bill_item';
import { CashRegister } from '../models/cash_register';
import { Product } from '../models/product';
import { Stockroom } from '../models/stockroom';
import { User } from '../models/user';
import {FirmService} from '../services/firm.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-firm-issue-bill',
  templateUrl: './firm-issue-bill.component.html',
  styleUrls: ['./firm-issue-bill.component.css']
})
export class FirmIssueBillComponent implements OnInit {


  constructor(private firmService: FirmService, private productService: ProductService, private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));

      this.firmService.getStockrooms(this.user.username).subscribe((stockrooms: Stockroom[]) => {
        this.stockrooms = stockrooms;
      })

      this.firmService.getCashRegisters(this.user.username).subscribe((cashRegisters: CashRegister[]) => {
        this.cashRegisters = cashRegisters;
      })
    }
  }



  setSelectedStockroom(s){
    this.selectedStockroom = s;
    this.productService.getFromStockroom(this.user.username, this.selectedStockroom.name).subscribe((products: Product[]) => {
      this.products = products;
    })
    
  }

  setSelectedCashRegister(cr){
    this.selectedCashRegister = cr;
    this.productService.getFromObject(this.user.username, cr.city, cr.streetAndNumber).subscribe((products: Product[]) => {
      this.products = products;
    })
  }

  add(p: Product){
    const dialogRef = this.dialog.open(FirmBillProductAmountComponent, {
      data: {amount: this.amount, unitOfMeasure: p.unitOfMeasure}
    });

    dialogRef.afterClosed().subscribe(res => {
      this.amount = res;
      let billItem: BillItem = new BillItem;
      billItem.product = p;
      billItem.amount = this.amount;
      billItem.sellingPrice = this.setSellingPrice(p);
      if (this.amount.valueOf() > this.availableAmount.valueOf()){
        alert("Nema toliko artikla na zalihama!");
      }
      else {
        this.billItems.push(billItem);
        if (this.selectedStockroom != null){
          this.productService.updateInStockStockroom(this.user.username, p.code, this.selectedStockroom.name, this.availableAmount.valueOf() - this.amount.valueOf()).subscribe((res) => {

          })
        }
        else if(this.selectedCashRegister != null){
          this.productService.updateInStockObject(this.user.username, p.code, this.selectedCashRegister.city, this.selectedCashRegister.streetAndNumber, this.availableAmount.valueOf() - this.amount.valueOf()).subscribe((res) => {

          })
        }
      }
    })
  }

  setSellingPrice(p: Product): Number{
    let price: Number = 0;
    if (this.selectedStockroom != null){
      p.objects.forEach(object => {
        if (object['stockroomName'] == this.selectedStockroom.name){
          price =  object['sellingPrice']; 
          this.availableAmount = object['inStock'];
        }
      });
    }
    else if (this.selectedCashRegister != null){
      p.objects.forEach(object => {
        if (object['city'] == this.selectedCashRegister.city && object['streetAndNumber'] == this.selectedCashRegister.streetAndNumber){
          price = object['sellingPrice'];
          this.availableAmount = object['inStock'];
        }
      });
    }
    return price;
  }

  endBill(){
    if (this.billItems.length == 0){
      alert("Racun je prazan!");
      return;
    }
    localStorage.setItem('billItems', JSON.stringify(this.billItems));
    if (this.selectedStockroom != null)
      localStorage.setItem('objectName', this.selectedStockroom.name.valueOf());
    else if (this.selectedCashRegister != null)
      localStorage.setItem('objectName', this.selectedCashRegister.city + "/" + this.selectedCashRegister.streetAndNumber);
    this.router.navigate(['firm/bill-payout']);
  }

  availableAmount: Number = 0;

  amount: Number;
  user: User = null;
  products: Product[] = [];
  stockrooms: Stockroom[] = [];
  cashRegisters: CashRegister[] = [];
  billItems: BillItem[] = [];
  selectedStockroom: Stockroom = null;
  selectedCashRegister: CashRegister = null;


}
