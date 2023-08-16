import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { User } from '../models/user';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-firm-product-category-dialog',
  templateUrl: './firm-product-category-dialog.component.html',
  styleUrls: ['./firm-product-category-dialog.component.css']
})
export class FirmProductCategoryDialogComponent implements OnInit {

  constructor(private productService: ProductService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem('category') != null){
      this.category = localStorage.getItem('category');
    }
    if (localStorage.getItem('subcategory') != null){
      this.subcategory = localStorage.getItem('subcategory');
    }
    
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.productService.getProducts(this.user.username).subscribe((products: Product[]) => {
        this.products = products;
      })
    }
  }

  productSearchForm = this.formBuilder.group({
    name: ['']
  })

  search(){
    this.error = '';
    this.info = '';
    this.products.forEach(product => {
      if (product.name.includes(this.productSearchForm.controls['name'].value)){
        this.selectedProduct = product;
        return;
      }
    });
  }

  add(){
    this.error = '';
    this.info = '';
    this.productService.updateCategory(this.user.username, this.selectedProduct.name, this.category + "/" + this.subcategory).subscribe((res) => {
      console.log("odgovor")
      if (res['msg'].includes('hasCategory')){
        let s: string = res['msg'];
        let parts: string[] = s.split('/');
        this.error = 'Ovom proizvodu je vec dodeljena kategorija ' + parts[1] + "/" + parts[2] + "!";
      }
      else
        this.info = 'Uspesno dodeljeno!';
    })
  }

  category: String;
  subcategory: String;

  selectedProduct: Product = null;
  products: Product[];
  user: User = null;

  error: string = '';
  info: string = '';
}
