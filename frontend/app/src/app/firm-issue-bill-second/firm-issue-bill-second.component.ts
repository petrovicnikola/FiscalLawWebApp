import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirmBillProductAmountComponent } from '../firm-bill-product-amount/firm-bill-product-amount.component';
import { FirmBillTableDialogComponent } from '../firm-bill-table-dialog/firm-bill-table-dialog.component';
import { Bill } from '../models/bill';
import { BillItem } from '../models/bill_item';
import { CashRegister } from '../models/cash_register';
import { Product } from '../models/product';
import { Room } from '../models/room';
import { Stockroom } from '../models/stockroom';
import { Table } from '../models/table';
import { User } from '../models/user';
import { FirmService } from '../services/firm.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-firm-issue-bill-second',
  templateUrl: './firm-issue-bill-second.component.html',
  styleUrls: ['./firm-issue-bill-second.component.css']
})
export class FirmIssueBillSecondComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  
  
  private ctx: CanvasRenderingContext2D;


  constructor(private firmService: FirmService, private productService: ProductService, private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));

      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.canvas.nativeElement.width = window.innerWidth;
      this.canvas.nativeElement.height = window.innerHeight;

      this.firmService.getRooms(this.user.username).subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      })

      this.firmService.getStockrooms(this.user.username).subscribe((stockrooms: Stockroom[]) => {
        this.stockrooms = stockrooms;
      })

      this.firmService.getCashRegisters(this.user.username).subscribe((cashRegisters: CashRegister[]) => {
        this.cashRegisters = cashRegisters;
      })
    }
  }

  selectRoom(r : Room){
    this.selectedRoom = r;
    this.tables = this.selectedRoom.tables;
    this.paintTables();
  }

  paintTables(){
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.selectedRoom.tables.forEach(table => {
      if (table.shape == 'rect'){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(table.x.valueOf(), table.y.valueOf(), table.width.valueOf(), table.height.valueOf());
        this.ctx.fillStyle = 'white';
        this.ctx.font = "18px serif";
        this.ctx.fillText(table.name.toString(), table.x.valueOf() + 10, table.y.valueOf() + 15)
      }
      else if (table.shape == 'circle'){
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.arc(table.x.valueOf(), table.y.valueOf(), table.r.valueOf(), 0, 2 * Math.PI)
        this.ctx.stroke();
        this.ctx.fillStyle = 'black';
        this.ctx.font = "18px serif";
        this.ctx.fillText(table.name.toString(), table.x.valueOf(), table.y.valueOf())
      }

      if (localStorage.getItem("bill" + this.selectedRoom.name + table.name)){
        let billItems: BillItem[] = JSON.parse(localStorage.getItem("bill" + this.selectedRoom.name + table.name));

        billItems.forEach(billItem => {
          if (billItem.tableNumber.valueOf() == Number.parseInt(table.name.toString())){
            this.ctx.fillStyle = 'grey';
            this.ctx.font = "18px serif";
            this.ctx.fillText("ZAUZETO", table.x.valueOf(), table.y.valueOf() + 20)
          }
        });
      }
    });
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
    localStorage.setItem('needTable', 'needTable');
    const dialogRef = this.dialog.open(FirmBillProductAmountComponent, {
      data: {amount: this.amount, unitOfMeasure: p.unitOfMeasure}
    });

    dialogRef.afterClosed().subscribe(res => {
      localStorage.removeItem('needTable');
      let tableNumber: number = JSON.parse(localStorage.getItem('tableNumber'));
      if (tableNumber == -1){
        alert ("Nije unesen broj stola");
        return;
      }

      this.amount = res;
      let billItem: BillItem = new BillItem;
      billItem.product = p;
      billItem.amount = this.amount;
      billItem.sellingPrice = this.setSellingPrice(p);
      billItem.tableNumber = tableNumber;
      billItem.room = this.selectedRoom.name;

      if (this.amount.valueOf() > this.availableAmount.valueOf()){
        alert("Nema toliko artikla na zalihama!");
      }
      else {
        let billItems: BillItem[] = [];
        if (localStorage.getItem("bill" + this.selectedRoom.name + ""+ billItem.tableNumber) != null)
          billItems = JSON.parse(localStorage.getItem("bill" + this.selectedRoom.name + ""+ billItem.tableNumber));
        billItems.push(billItem);
        localStorage.setItem("bill" + this.selectedRoom.name + ""+ billItem.tableNumber, JSON.stringify(billItems));
        this.paintTables();
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
    const dialogRef = this.dialog.open(FirmBillTableDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      let tableNumber: number = JSON.parse(localStorage.getItem('closedTable'));
      if (localStorage.getItem("bill" + this.selectedRoom.name + ""+ tableNumber) == null){
        alert("Racun je prazan!");
        return;
      }
      let billItems: BillItem[] = JSON.parse(localStorage.getItem("bill" + this.selectedRoom.name + ""+ tableNumber));
      localStorage.removeItem("bill" + this.selectedRoom.name + ""+ tableNumber);
      localStorage.setItem('billItems', JSON.stringify(billItems));
      if (this.selectedStockroom != null)
        localStorage.setItem('objectName', this.selectedStockroom.name.valueOf());
      else if (this.selectedCashRegister != null)
        localStorage.setItem('objectName', this.selectedCashRegister.city + "/" + this.selectedCashRegister.streetAndNumber);
      this.router.navigate(['firm/bill-payout']);
    }) 
  }

  availableAmount: Number = 0;

  amount: Number;
  user: User = null;
  products: Product[] = [];
  stockrooms: Stockroom[] = [];
  cashRegisters: CashRegister[] = [];
  selectedStockroom: Stockroom = null;
  selectedCashRegister: CashRegister = null;


  rooms: Room[] = [];
  tables: Table[] = [];
  selectedRoom: Room = null;
}
