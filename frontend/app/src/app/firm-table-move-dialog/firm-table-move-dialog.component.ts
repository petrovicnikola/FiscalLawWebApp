import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-firm-table-move-dialog',
  templateUrl: './firm-table-move-dialog.component.html',
  styleUrls: ['./firm-table-move-dialog.component.css']
})
export class FirmTableMoveDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FirmTableMoveDialogComponent>) { }

  ngOnInit(): void {
  }

  infoForm = this.formBuilder.group({
    name: ['', Validators.required],
    x: [0, Validators.required],
    y: [0, Validators.required]
  })

  confirm(){
    if (this.infoForm.invalid){
      return;
    }
    localStorage.setItem('name', this.infoForm.controls['name'].value);
    localStorage.setItem('x', this.infoForm.controls['x'].value.toString());
    localStorage.setItem('y', this.infoForm.controls['y'].value.toString());
    this.dialogRef.close();
  }
}
