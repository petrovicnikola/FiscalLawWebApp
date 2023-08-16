import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FirmProductCategoryDialogComponent } from '../firm-product-category-dialog/firm-product-category-dialog.component';
import { Category } from '../models/category';
import {ProductService} from '../services/product.service'

@Component({
  selector: 'app-firm-product-create-category',
  templateUrl: './firm-product-create-category.component.html',
  styleUrls: ['./firm-product-create-category.component.css']
})
export class FirmProductCreateCategoryComponent implements OnInit {

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    })
  }

  categoryForm = this.formBuilder.group({
    name: ['', Validators.required]
  })

  subcategoryForm = this.formBuilder.group({
    name: ['', Validators.required]
  })

  productToCategoryForm = this.formBuilder.group({
    category: ['', Validators.required],
    subcategory: ['']
  })

  addNewCategory(){
    this.error = '';
    if (this.categoryForm.invalid)
      return;
    
      this.productService.addNewCategory(this.categoryForm.controls['name'].value).subscribe((res) => {
        if (res['msg'] == 'ok')
          window.location.reload();
        else
          this.error = "Ova kategorija vec postoji!";
      });
  }

  addNewSubcategory(){
    this.error = '';
    if (this.subcategoryForm.invalid)
      return;
    
    this.productService.addNewSubcategory(this.selectedCategory, this.subcategoryForm.controls['name'].value).subscribe((res) => {
      window.location.reload()
    }) 
  }

  showAddCategory(){
    this.addCategory = !this.addCategory;
  }

  showAddSubCategory(){
    this.addSubcategory = !this.addSubcategory;
  }

  showSubcategory(name){
    this.selectedCategory = name;

  }

  getSubcategoriesForCategory(c: Category){
    this.subcategories = c.subcategories;
  }

  addProductToCategory(){
    if (this.productToCategoryForm.invalid)
      return;
    
    localStorage.setItem('category', this.productToCategoryForm.controls['category'].value);
    localStorage.setItem('subcategory', this.productToCategoryForm.controls['subcategory'].value);
    const ref = this.dialog.open(FirmProductCategoryDialogComponent)

    ref.afterClosed().subscribe(() => {
      if (localStorage.getItem('category') != null)
        localStorage.removeItem('category');
      if (localStorage.getItem('subcategory') != null)
        localStorage.removeItem('subcategory');
    })
  }

  categories: Category[] = [];

  selectedCategory: string = "";
  addCategory: boolean = false;
  addSubcategory: boolean = false;
  error: string = '';

  categoryToAdd: string = '';
  subcategories: Array<String>;
}
