import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../firm-bill-product-amount/firm-bill-product-amount.component';

@Component({
  selector: 'app-firm-table-dialog',
  templateUrl: './firm-table-dialog.component.html',
  styleUrls: ['./firm-table-dialog.component.css']
})
export class FirmTableDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,public dialogRef: MatDialogRef<FirmTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {

  }

  infoForm = this.formBuilder.group({
    name: ['', Validators.required],
    shape: ['', Validators.required],
    width: [0],
    height: [0],
    r: [0]
  });


  add(){
    this.error = '';
    if (this.infoForm.invalid){
      this.error = 'Neispravno popunjena forma!';
      return;
    }
    if ((this.infoForm.controls['width'].value == 0 || this.infoForm.controls['height'].value == 0) && this.infoForm.controls['shape'].value == "rect"){
      this.error = "Neispravno popunjena forma!";
      return;
    }

    if (this.infoForm.controls['r'].value == 0 && this.infoForm.controls['shape'].value == "circle"){
        this.error = "Neispravno popunjena forma!";
        return;  
    }

    localStorage.setItem('table', JSON.stringify({
      "name" : this.infoForm.controls['name'].value,
      "shape": this.infoForm.controls['shape'].value,
      "width" :  this.infoForm.controls['width'].value,
      "height" : this.infoForm.controls['height'].value,
      "r": this.infoForm.controls['r'].value
    }));

    this.dialogRef.close();
  }

  leave(){
    this.dialogRef.close();
  }

  error: string = '';
}
