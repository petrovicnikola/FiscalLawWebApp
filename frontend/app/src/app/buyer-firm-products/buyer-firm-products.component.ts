import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product } from '../models/product';
import { User } from '../models/user';
import { FirmService } from '../services/firm.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-buyer-firm-products',
  templateUrl: './buyer-firm-products.component.html',
  styleUrls: ['./buyer-firm-products.component.css']
})
export class BuyerFirmProductsComponent implements OnInit {

  constructor(private firmService: FirmService, private productService: ProductService, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem('firm') != null){
      this.firm = JSON.parse(localStorage.getItem('firm'));
      this.productService.getProducts(this.firm.username).subscribe((products: Product[]) => {
        this.products = products;
        this.products.forEach(product => {
          let objects: String[] = [];

          let minPrice:number = 9999999;
          product.objects.forEach(object => {
            if (object['inStock'] > 0){
              if (minPrice > object['sellingPrice']){
                minPrice = object['sellingPrice'];
              }
              if (object['isStockroom'] == true){
                objects.push(object['stockroomName']);
              }
              else {
                objects.push(object['city'] + "/" + object['streetAndNumber']);
              }
            }
          });

          if (minPrice == 9999999){
            minPrice = -1;
            objects.push('Nije na stanju')
          }

          this.productsRepresentation.push(new ProductRepresentation(product.name, product.producer, objects, minPrice));
        });
        this.allProductsRepresentation = this.productsRepresentation;
      })
    }
  }

  searchForm = this.formBuilder.group({
    producer: [''],
    name: ['']
  })

  search(){
    let producer = this.searchForm.controls['producer'].value;
    let name = this.searchForm.controls['name'].value;
    if (producer == '' && name == ''){
      this.productsRepresentation = this.allProductsRepresentation;
      return;
    }
    
    let newProductRepresentation: ProductRepresentation[] = [];
    this.allProductsRepresentation.forEach(p => {
      if (name != '' && producer == ''){
        if (p.name.includes(name))
          newProductRepresentation.push(p);
      }
      else if (name == '' && producer != ''){
        if (p.producer.includes(producer))
          newProductRepresentation.push(p);
      }
      else if (name != '' && producer != ''){
        if (p.producer.includes(producer) && p.name.includes(name))
          newProductRepresentation.push(p);
      }
    });

    this.productsRepresentation = newProductRepresentation;
  }

  products: Product[] = [];
  firm: User = null;
  productsRepresentation: ProductRepresentation[] = [];
  allProductsRepresentation: ProductRepresentation[] = [];
}


class ProductRepresentation{
  name: String;
  producer: String;
  objects: String[];
  minSellingPrice: Number;

   constructor(name, producer, objects, minSellingPrice){
    this.name = name;
    this.producer = producer;
    this.objects = objects;
    this.minSellingPrice = minSellingPrice;
   }
}