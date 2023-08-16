import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(username, code, name, unitOfMeasure, tax, type, countryOfOrigin, foreignName, barCode, producer, customTariff, ecoTax, akciza, minWantedAmount, maxWantedAmount, description, declaration, file){
    let formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('code', code);
    formData.append('name', name);
    formData.append('unitOfMeasure', unitOfMeasure);
    formData.append('tax', tax);
    formData.append('type', type);
    formData.append('countryOfOrigin', countryOfOrigin);
    formData.append('foreignName', foreignName);
    formData.append('barCode', barCode);
    formData.append('producer', producer);
    formData.append('customTariff', customTariff);
    formData.append('ecoTax', ecoTax);
    formData.append('akciza', akciza);
    formData.append('minWantedAmount', minWantedAmount);
    formData.append('maxWantedAmount', maxWantedAmount);
    formData.append('description', description);
    formData.append('declaration', declaration);
    formData.append('img', file);
    if (file != null)
      formData.append('hasImg', true + "");
    else
      formData.append('hasImg', false + "");
    /*const data = {
      username:username,
      code: code, 
      name: name, 
      unitOfMeasure: unitOfMeasure,
      tax: tax,
      type: type,
      countryOfOrigin: countryOfOrigin, 
      foreignName: foreignName,
      barCode: barCode,
      producer: producer,
      customTariff: customTariff,
      ecoTax: ecoTax,
      akciza: akciza,
      minWantedAmount: minWantedAmount,
      maxWantedAmount: maxWantedAmount,
      description: description,
      declaration: declaration
    }
    */
    return this.http.post(`http://localhost:4000/products/addNewProduct`, formData);
  }

  getProducts(username){
    const data = {
      username: username
    }

    return this.http.post(`http://localhost:4000/products/getProducts`, data)
  }

  deleteProduct(username, code){
    const data = {
      username: username,
      code: code
    }

    return this.http.post(`http://localhost:4000/products/deleteProduct`, data)
  }

  updateProduct(username, code, name, unitOfMeasure, tax, type, countryOfOrigin, foreignName, barCode, producer, customTariff, ecoTax, akciza, minWantedAmount, maxWantedAmount, description, declaration, hasImg){

    const data = {
      username:username,
      code: code, 
      name: name, 
      unitOfMeasure: unitOfMeasure,
      tax: tax,
      type: type,
      countryOfOrigin: countryOfOrigin, 
      foreignName: foreignName,
      barCode: barCode,
      producer: producer,
      customTariff: customTariff,
      ecoTax: ecoTax,
      akciza: akciza,
      minWantedAmount: minWantedAmount,
      maxWantedAmount: maxWantedAmount,
      description: description,
      declaration: declaration,
      hasImg: hasImg
    }

    return this.http.post(`http://localhost:4000/products/updateProduct`, data);
  }

  addToStockroom(code, username, stockroomName, buyingPrice, sellingPrice, inStock, minWantedAmount, maxWantedAmount){
    const data = {
      code: code,
      username: username,
      stockroomName: stockroomName,
      buyingPrice: buyingPrice, 
      sellingPrice: sellingPrice,
      inStock: inStock,
      minWantedAmount: minWantedAmount,
      maxWantedAmount: maxWantedAmount
    }

    return this.http.post(`http://localhost:4000/products/addToStockroom`, data);
  }

  getFromStockroom(username, stockroomName){
    const data = {
      username: username,
      stockroomName: stockroomName
    }

    return this.http.post(`http://localhost:4000/products/getFromStockroom`, data);
  }

  addToObject(code: String, username: String, city: String, streetAndNumber: String, buyingPrice, sellingPrice, inStock, minWantedAmount, maxWantedAmount) {
    const data = {
      code: code,
      username: username,
      city: city,
      streetAndNumber: streetAndNumber,
      buyingPrice: buyingPrice, 
      sellingPrice: sellingPrice,
      inStock: inStock,
      minWantedAmount: minWantedAmount,
      maxWantedAmount: maxWantedAmount
    }

    return this.http.post(`http://localhost:4000/products/addToObject`, data);
  }

  getFromObject(username, city, streetAndNumber){
    const data = {
      username: username,
      city: city,
      streetAndNumber: streetAndNumber
    }

    return this.http.post(`http://localhost:4000/products/getFromObject`, data);
  }

  getAllCategories(){
    return this.http.get('http://localhost:4000/products/getAllCategories');
  }

  addNewCategory(name){
    let data = {
      name: name
    }

    return this.http.post('http://localhost:4000/products/addNewCategory', data);
  }

  addNewSubcategory(categoryName, subcategoryName) {
    let data = {
      categoryName: categoryName,
      subcategoryName: subcategoryName
    }

    return this.http.post('http://localhost:4000/products/addNewSubcategory', data);
  }

  updateCategory(username, productName, category) {
    let data = {
      category: category,
      username: username,
      productName: productName
    }

    return this.http.post('http://localhost:4000/products/updateCategory', data);
  }

  updateInStockStockroom(username, code, stockroomName, newInStock){
    const data = {
      username: username,
      code: code,
      stockroomName: stockroomName,
      newInStock: newInStock
    }

    return this.http.post('http://localhost:4000/products/updateInStockStockroom', data);
  }

  updateInStockObject(username, code, city, streetAndNumber, newInStock){
    const data = {
      username: username,
      code: code,
      city:city,
      streetAndNumber: streetAndNumber,
      newInStock: newInStock
    }
    return this.http.post('http://localhost:4000/products/updateInStockObject', data);
  }
}
