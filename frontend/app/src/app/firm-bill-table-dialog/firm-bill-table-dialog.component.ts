import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-firm-bill-table-dialog',
  templateUrl: './firm-bill-table-dialog.component.html',
  styleUrls: ['./firm-bill-table-dialog.component.css']
})
export class FirmBillTableDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FirmBillTableDialogComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  infoForm = this.formBuilder.group({
    name: [0, Validators.required]
  })

  setTable(){
    if (this.infoForm.invalid){
      alert("Neispravno popunjeno!")
      return;
    }
    localStorage.setItem("closedTable", this.infoForm.controls['name'].value.toString());

    this.dialogRef.close();
  }

}
