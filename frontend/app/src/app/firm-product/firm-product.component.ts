import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { Stockroom } from '../models/stockroom';
import { CashRegister} from '../models/cash_register';
import { User } from '../models/user';
import { ProductService } from '../services/product.service';
import { FirmService } from '../services/firm.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FirmDeleteProductDialogComponent } from '../firm-delete-product-dialog/firm-delete-product-dialog.component';

@Component({
  selector: 'app-firm-product',
  templateUrl: './firm-product.component.html',
  styleUrls: ['./firm-product.component.css']
})
export class FirmProductComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router, private firmService: FirmService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));

      this.productService.getProducts(this.user.username).subscribe((products: Product[]) => {
        this.products = products;
        this.numOfProducts = this.products.length;
        this.selectedProducts = this.products;
        this.pageEvent = new PageEvent
        this.pageEvent.pageIndex = 0
        this.selectedProducts = this.selectedProducts.slice(this.pageEvent.pageIndex*10, this.pageEvent.pageIndex*10 + 10)
      })

      this.firmService.getCashRegisters(this.user.username).subscribe((cashRegisters: CashRegister[]) => {
        this.cashRegisters = cashRegisters;
      })

      this.firmService.getStockrooms(this.user.username).subscribe((stockrooms: Stockroom[]) => {
        this.stockrooms = stockrooms;
      })
    }

    if (localStorage.getItem('product') != null)
      this.product = JSON.parse(localStorage.getItem('product'));
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
    customTariff: [0],
    ecoTax: [false],
    akciza: [false],
    minWantedAmount: [0],
    maxWantedAmount: [0],
    description:  [''],
    declaration:  ['']
  });


  

  addNewProduct(){
    this.showEntry = !this.showEntry;
  }

  addProduct(){
    this.error = '';
    if (this.productForm.invalid){
      this.error = 'Neispravno popunjena forma!';
      return;
    }
    
    this.productService.addProduct(this.user.username,
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
      this.file).subscribe((res) => {
        if (res['message'] == 'codeErr')
          this.error = 'Sifra artikla nije jedinstvena!';
        else if (res['message'] == 'ok'){
          this.product = res['product'];
          localStorage.setItem('product', JSON.stringify(this.product));
          alert("Proizvod uspesno dodat!")
          window.location.reload();
        }
      })

  }

  delete(p: Product){
    const dialogRef = this.dialog.open(FirmDeleteProductDialogComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res == "yes"){
        this.productService.deleteProduct(this.user.username, p.code).subscribe((res) => {
          window.location.reload();
        });
      }
    })
  }

  update(p: Product){
    localStorage.setItem('product', JSON.stringify(p));
    this.router.navigate(['firm/update-product']);
  }

  addToStockroom(s: Stockroom){
    localStorage.setItem('stockroom', JSON.stringify(s));
    this.router.navigate(['firm/product-add-to-stockroom']);
  }

  addToObject(cr: CashRegister){
    localStorage.setItem('cashRegister', JSON.stringify(cr));
    this.router.navigate(['firm/product-add-to-stockroom']);
  }

  end(){
    localStorage.removeItem('product');
    window.location.reload();
  }

  onFileChanged(event){
    this.file = event.target.files[0];
    var reader = new FileReader()
    console.log(this.file)
    reader.readAsDataURL(this.file)
    reader.onload = (e) =>{
      var img = new Image()
      img.onload = () =>{
        if (img.width < 100 || img.width > 300 || img.height < 100 || img.width > 300){
          alert("Slika mora imati dimenzije izmedju 100 i 300 px")
        }
        else{
          this.file = event.target.files[0];
        }
      }
    }
  }

  changedPage(event){
   this.pageEvent = event;
   this.selectedProducts = this.products;
   this.selectedProducts = this.selectedProducts.slice(this.pageEvent.pageIndex*10, this.pageEvent.pageIndex*10 + 10)
  }

  showEntry: boolean = false;
  user: User = null;
  products: Product[] = [];
  selectedProducts: Product[] = [];
  stockrooms: Stockroom[] = [];
  cashRegisters: CashRegister[] = [];
  error: string = '';
  product: Product = null;
  numOfProducts: number;
  pageEvent: PageEvent;

  file: File = null;
}
