import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CashRegister } from '../models/cash_register';
import { Product } from '../models/product';
import { Stockroom } from '../models/stockroom';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-firm-product-price',
  templateUrl: './firm-product-price.component.html',
  styleUrls: ['./firm-product-price.component.css']
})
export class FirmProductPriceComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    if (localStorage.getItem('stockroom') != null){
      this.stockroom = JSON.parse(localStorage.getItem('stockroom'));
    }
    if (localStorage.getItem('cashRegister') != null){
      this.cashRegister = JSON.parse(localStorage.getItem('cashRegister'));
    }

    if (localStorage.getItem('product') != null){
      this.product = JSON.parse(localStorage.getItem('product'));
    }
  }

  infoForm = this.formBuilder.group({
    buyingPrice: [0, Validators.required],
    sellingPrice: [0, Validators.required],
    inStock: [0, Validators.required],
    minWantedAmount: [0, Validators.required],
    maxWantedAmount: [0, Validators.required]
  })

  add(){
    this.error = '';
    if (this.infoForm.invalid){
      this.error = "Nevalidno popunjena forma!";
      return;
    }

    if (this.stockroom != null){
      this.productService.addToStockroom(this.product.code, this.product.username,
        this.stockroom.name, 
        this.infoForm.controls['buyingPrice'].value,
        this.infoForm.controls['sellingPrice'].value,
        this.infoForm.controls['inStock'].value,
        this.infoForm.controls['minWantedAmount'].value,
        this.infoForm.controls['maxWantedAmount'].value).subscribe((res) => {
          alert("Dodao");
          this.back();
        });
    }
    else if (this.cashRegister != null){
      this.productService.addToObject(this.product.code, this.product.username,
        this.cashRegister.city,
        this.cashRegister.streetAndNumber,
        this.infoForm.controls['buyingPrice'].value,
        this.infoForm.controls['sellingPrice'].value,
        this.infoForm.controls['inStock'].value,
        this.infoForm.controls['minWantedAmount'].value,
        this.infoForm.controls['maxWantedAmount'].value
        ).subscribe((res) => {
          alert("Dodao");
          this.back();
        });
    }
  }

  back(){
    this.clearLocalStorage();
    this.router.navigate(['firm/products']);
  }

  clearLocalStorage(){
    if (this.stockroom != null)
      localStorage.removeItem('stockroom');
    if (this.cashRegister != null)
      localStorage.removeItem('cashRegister');
  }

  stockroom: Stockroom = null;
  cashRegister: CashRegister = null;
  product: Product = null;
  error: string = '';
}
