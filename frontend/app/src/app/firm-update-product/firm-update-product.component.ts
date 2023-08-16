import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { User } from '../models/user';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-firm-update-product',
  templateUrl: './firm-update-product.component.html',
  styleUrls: ['./firm-update-product.component.css']
})
export class FirmUpdateProductComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));
      if (localStorage.getItem('product') != null){
        this.product = JSON.parse(localStorage.getItem('product'));

        this.productForm.setValue({
          code: this.product.code.toString(),
          name: this.product.name.toString(),
          unitOfMeasure: this.product.unitOfMeasure.toString(),
          tax: this.product.tax.valueOf(),
          type: this.product.type.toString(),
          countryOfOrigin: this.product.countryOfOrigin.toString(),
          foreignName: this.product.foreignName.toString(),
          barCode: this.product.barCode.toString(),
          producer: this.product.producer.toString(),
          customTariff: this.product.customTariff.valueOf(),
          ecoTax: this.product.ecoTax.valueOf(),
          akciza: this.product.akciza.valueOf(),
          minWantedAmount: this.product.minWantedAmount.valueOf(),
          maxWantedAmount: this.product.maxWantedAmount.valueOf(),
          description:  this.product.description.toString(),
          declaration: this.product.declaration.toString()
        })
      }
    }
  }

  productForm = this.formBuilder.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    unitOfMeasure: ['', Validators.required],
    tax: [0, Validators.required],
    type: [''], // samo kod ugostitelja
    // Neobavezni podaci
    countryOfOrigin: [''],
    foreignName:  [''],
    barCode:  [''],
    producer:  [''],
    customTariff: [0, Validators.required],
    ecoTax: [false],
    akciza: [false],
    minWantedAmount: [0],
    maxWantedAmount: [0],
    description:  [''],
    declaration:  ['']
  });

  updateProduct(){
    this.error = '';
    if (this.productForm.invalid){
      this.error = 'Neispravno popunjena forma!';
      return;
    }
    this.productService.updateProduct(this.user.username,
      this.productForm.controls['code'].value,
      this.productForm.controls['name'].value,
      this.productForm.controls['unitOfMeasure'].value,
      this.productForm.controls['tax'].value,
      this.productForm.controls['type'].value,
      this.productForm.controls['countryOfOrigin'].value,
      this.productForm.controls['foreignName'].value,
      this.productForm.controls['barCode'].value,
      this.productForm.controls['producer'].value,
      this.productForm.controls['customTariff'].value,
      this.productForm.controls['ecoTax'].value,
      this.productForm.controls['akciza'].value,
      this.productForm.controls['minWantedAmount'].value,
      this.productForm.controls['maxWantedAmount'].value,
      this.productForm.controls['description'].value,
      this.productForm.controls['declaration'].value,
      this.product.hasImg).subscribe((res) => {
        localStorage.removeItem('product');
        this.router.navigate(['firm/products']).then(() => {
          window.location.reload();
        })
      })

  }

  back(){
    localStorage.removeItem('product');
    this.router.navigate(['firm/products']);
  }

  user: User = null;
  product: Product = null;
  error: string = '';
}
