import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  amount: Number;
  unitOfMeasure: String;
}

@Component({
  selector: 'app-firm-bill-product-amount',
  templateUrl: './firm-bill-product-amount.component.html',
  styleUrls: ['./firm-bill-product-amount.component.css']
})
export class FirmBillProductAmountComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FirmBillProductAmountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}


  ngOnInit(): void {
    if (localStorage.getItem('needTable') != null){
      this.needTable = true;
    }
  }

  addTableNumber(){
    if (this.tableNumber == null)
      localStorage.setItem('tableNumber', JSON.stringify(-1));
    else
      localStorage.setItem('tableNumber', JSON.stringify(this.tableNumber));
  }

  needTable: boolean = false;
  tableNumber: number = null;
}
