import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-firm-delete-product-dialog',
  templateUrl: './firm-delete-product-dialog.component.html',
  styleUrls: ['./firm-delete-product-dialog.component.css']
})
export class FirmDeleteProductDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FirmDeleteProductDialogComponent>) { }

  ngOnInit(): void {
  }

  delete(){
    this.dialogRef.close("yes");
  }

  back(){
    this.dialogRef.close("no");
  }

}
