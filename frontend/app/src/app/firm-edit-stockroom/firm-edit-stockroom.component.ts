import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stockroom } from '../models/stockroom';
import { FirmService } from '../services/firm.service';

@Component({
  selector: 'app-firm-edit-stockroom',
  templateUrl: './firm-edit-stockroom.component.html',
  styleUrls: ['./firm-edit-stockroom.component.css']
})
export class FirmEditStockroomComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private firmService: FirmService) { }

  ngOnInit(): void {
    if (localStorage.getItem('stockroom') != null){
      this.stockroom = JSON.parse(localStorage.getItem('stockroom'));
      this.stockroomForm.setValue({
        name: this.stockroom.name.toString()
      })
    }
  }

  stockroomForm = this.formBuilder.group({
    name: ['', Validators.required]
  })

  update(){
    this.error = '';
    if (this.stockroomForm.invalid){
      this.error = 'Morate uneti naziv magacina!';
      return;
    }

    this.firmService.updateStockroom(this.stockroom.username, this.stockroom._id, this.stockroom.name, 
      this.stockroomForm.controls['name'].value).subscribe((res) => {
        if (res){
          localStorage.removeItem('stockroom');
          this.router.navigate(['firm/stockrooms-cash-registers']).then(() => {
            window.location.reload();
          })
        }
    })
  }

  back(){
    localStorage.removeItem('stockroom');
    this.router.navigate(['firm/stockrooms-cash-registers']);
  }

  stockroom: Stockroom;
  error: string = '';
}
