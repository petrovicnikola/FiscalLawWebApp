import e, * as express from 'express';
import { Request, Response } from 'express-serve-static-core';
import Product from '../models/product.model';
import Category from '../models/category.model';


export class ProductController{
    addNewProduct = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let code = req.body.code;

        Product.findOne({username: username, code: code}, (err, res1) => {
            if (err)
                console.log(err);
            else if (res1)
                res.json({'message':'codeErr'})
            else {
                let product = new Product(req.body).save((err, rez) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({'message':'ok', "product" : rez});
                })
            }          
        })
    }

    getProducts = (req: express.Request, res: express.Response) => {
        let username = req.body.username;


        Product.find({username: username}, (err, products) => {
            if (err)
                console.log(err);
            else
                res.json(products);
        })
    }

    deleteProduct = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let code = req.body.code;

        Product.deleteOne({username: username, code: code}, (err) => {
            if (err)
                console.log(err);
            else
                res.json('ok');
        })
    }

    updateProduct = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let code = req.body.code;

        Product.collection.replaceOne({username: username, code: code}, req.body, (err, rez) => {
            if (err)
                console.log(err);
            else
                res.json('ok');
        })
    }

    addToStockroom = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let code = req.body.code;
        let stockroomName = req.body.stockroomName;
        let buyingPrice =  req.body.buyingPrice; 
        let sellingPrice  = req.body.sellingPrice;
        let inStock =  req.body.inStock;
        let minWantedAmount =  req.body.minWantedAmount
        let maxWantedAmount =  req.body.maxWantedAmount;

        Product.collection.updateOne({username: username, code: code}, {$push: {objects: {stockroomName: stockroomName, buyingPrice:buyingPrice, sellingPrice: sellingPrice, inStock: inStock, minWantedAmount: minWantedAmount, maxWantedAmount, isStockroom: true}}}, (err, rez) => {
            if (err)
                console.log(err);
            else
                res.json('ok');
        })
    }

    addToObject = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let code = req.body.code;
        let city = req.body.city;
        let streetAndNumber = req.body.streetAndNumber;
        let buyingPrice =  req.body.buyingPrice; 
        let sellingPrice  = req.body.sellingPrice;
        let inStock =  req.body.inStock;
        let minWantedAmount =  req.body.minWantedAmount
        let maxWantedAmount =  req.body.maxWantedAmount;

        Product.collection.updateOne({username: username, code: code}, {$push: {objects: {city: city, streetAndNumber:streetAndNumber, buyingPrice:buyingPrice, sellingPrice: sellingPrice, inStock: inStock, minWantedAmount: minWantedAmount, maxWantedAmount, isStockroom: false}}}, (err, rez) => {
            if (err)
                console.log(err);
            else
                res.json('ok');
        })
    }

    getAllCategories = (req: express.Request, res: express.Response) => {
        Category.find((err, categories) => {
            if (err)
                console.log(err);
            else
                res.json(categories);
        })
    }

    addNewCategory = (req: express.Request, res: express.Response) => {
        let name = req.body.name;

        Category.findOne({name: name}, (err, rez) => {
            if (err)
                console.log(err);
            else if (rez)
                res.json({'msg':'notOK'});
            else {
                let category = new Category(req.body).save((err1, rez1) => {
                    if (err1)
                        console.log(err1);
                    else
                        res.json({'msg':'ok'});
                })
            }
        })
    }

    addNewSubcategory = (req: express.Request, res: express.Response) => {
        let categoryName = req.body.categoryName;
        let subcategoryName = req.body.subcategoryName;

        Category.findOne({name: categoryName}, (err, rez) => {
            if (err)
                console.log(err);
            else if (!rez)
                res.json({'msg': 'notExists'})
            else {
                Category.findOne({name: categoryName, subcategories: {name: subcategoryName}}, (err1, rez1) => {
                    if (err1)
                        console.log(err1);
                    else  if (rez1)
                        res.json({'msg':'exists'});
                    else 
                        Category.collection.updateOne({name: categoryName}, {$push : {subcategories: subcategoryName}}, (err2, rez2) => {
                            if (err2)
                                console.log(err2);
                            else
                                res.json({'msg': 'ok'});
                        })
                })
            }
        })
    }

    updateCategory = (req: express.Request, res: express.Response) => {
        
        let category = req.body.category;
        let username = req.body.username;
        let productName = req.body.productName;


        Product.collection.findOne({username: username, name: productName}, (err, product) => {
            if (err)
                console.log(err);
            else if (product){
                if (product['category'] != null){
                    res.json({'msg': 'hasCategory/' +product['category']});
                    return;
                }
                else {
                    Product.collection.updateOne({username: username, name: productName}, {$set: {category: category}}, (err, rez) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({'msg':'ok'});
                    })
                }
            }

        })
    }

    getFromStockroom = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let stockroomName = req.body.stockroomName;


        Product.find({username: username, 'objects.stockroomName': stockroomName}, (err, rez) => {
            if (err)
                console.log(err);
            else{
                res.json(rez);
            }
        })
    }

    getFromObject = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let city = req.body.city;
        let streetAndNumber = req.body.streetAndNumber;

        Product.find({username: username, 'objects.city' : city, 'objects.streetAndNumber': streetAndNumber}, (err, rez) => {
            if (err)
                console.log(err);
            else
                res.json(rez);
        })
    }

    updateInStockStockroom = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let code = req.body.code;
        let stockroomName = req.body.stockroomName;
        let newInStock = req.body.newInStock;

        Product.collection.updateOne({username: username, code: code, 'objects.stockroomName': stockroomName}, {$set: {'objects.$.inStock' : newInStock}}, (err, rez) => {
            if (err)
                console.log(err);
            else
                res.json('ok');
        })

    }

    updateInStockObject = (req: express.Request, res: express.Response) => {

    }
}