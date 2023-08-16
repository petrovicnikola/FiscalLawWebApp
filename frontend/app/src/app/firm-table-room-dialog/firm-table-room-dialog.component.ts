import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-firm-table-room-dialog',
  templateUrl: './firm-table-room-dialog.component.html',
  styleUrls: ['./firm-table-room-dialog.component.css']
})
export class FirmTableRoomDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FirmTableRoomDialogComponent>) { }

  ngOnInit(): void {
  }

  infoForm = this.formBuilder.group({
    name: ['', Validators.required]
  })

  confirm(){
    if (this.infoForm.invalid){
      return;
    }
    localStorage.setItem('roomName', this.infoForm.controls['name'].value);
    this.dialogRef.close();
  }
}
