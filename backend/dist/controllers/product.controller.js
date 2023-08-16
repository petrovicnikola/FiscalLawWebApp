"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
class ProductController {
    constructor() {
        this.addNewProduct = (req, res) => {
            let username = req.body.username;
            let code = req.body.code;
            product_model_1.default.findOne({ username: username, code: code }, (err, res1) => {
                if (err)
                    console.log(err);
                else if (res1)
                    res.json({ 'message': 'codeErr' });
                else {
                    let product = new product_model_1.default(req.body).save((err, rez) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'ok', "product": rez });
                    });
                }
            });
        };
        this.getProducts = (req, res) => {
            let username = req.body.username;
            product_model_1.default.find({ username: username }, (err, products) => {
                if (err)
                    console.log(err);
                else
                    res.json(products);
            });
        };
        this.deleteProduct = (req, res) => {
            let username = req.body.username;
            let code = req.body.code;
            product_model_1.default.deleteOne({ username: username, code: code }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json('ok');
            });
        };
        this.updateProduct = (req, res) => {
            let username = req.body.username;
            let code = req.body.code;
            product_model_1.default.collection.replaceOne({ username: username, code: code }, req.body, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json('ok');
            });
        };
        this.addToStockroom = (req, res) => {
            let username = req.body.username;
            let code = req.body.code;
            let stockroomName = req.body.stockroomName;
            let buyingPrice = req.body.buyingPrice;
            let sellingPrice = req.body.sellingPrice;
            let inStock = req.body.inStock;
            let minWantedAmount = req.body.minWantedAmount;
            let maxWantedAmount = req.body.maxWantedAmount;
            product_model_1.default.collection.updateOne({ username: username, code: code }, { $push: { objects: { stockroomName: stockroomName, buyingPrice: buyingPrice, sellingPrice: sellingPrice, inStock: inStock, minWantedAmount: minWantedAmount, maxWantedAmount, isStockroom: true } } }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json('ok');
            });
        };
        this.addToObject = (req, res) => {
            let username = req.body.username;
            let code = req.body.code;
            let city = req.body.city;
            let streetAndNumber = req.body.streetAndNumber;
            let buyingPrice = req.body.buyingPrice;
            let sellingPrice = req.body.sellingPrice;
            let inStock = req.body.inStock;
            let minWantedAmount = req.body.minWantedAmount;
            let maxWantedAmount = req.body.maxWantedAmount;
            product_model_1.default.collection.updateOne({ username: username, code: code }, { $push: { objects: { city: city, streetAndNumber: streetAndNumber, buyingPrice: buyingPrice, sellingPrice: sellingPrice, inStock: inStock, minWantedAmount: minWantedAmount, maxWantedAmount, isStockroom: false } } }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json('ok');
            });
        };
        this.getAllCategories = (req, res) => {
            category_model_1.default.find((err, categories) => {
                if (err)
                    console.log(err);
                else
                    res.json(categories);
            });
        };
        this.addNewCategory = (req, res) => {
            let name = req.body.name;
            category_model_1.default.findOne({ name: name }, (err, rez) => {
                if (err)
                    console.log(err);
                else if (rez)
                    res.json({ 'msg': 'notOK' });
                else {
                    let category = new category_model_1.default(req.body).save((err1, rez1) => {
                        if (err1)
                            console.log(err1);
                        else
                            res.json({ 'msg': 'ok' });
                    });
                }
            });
        };
        this.addNewSubcategory = (req, res) => {
            let categoryName = req.body.categoryName;
            let subcategoryName = req.body.subcategoryName;
            category_model_1.default.findOne({ name: categoryName }, (err, rez) => {
                if (err)
                    console.log(err);
                else if (!rez)
                    res.json({ 'msg': 'notExists' });
                else {
                    category_model_1.default.findOne({ name: categoryName, subcategories: { name: subcategoryName } }, (err1, rez1) => {
                        if (err1)
                            console.log(err1);
                        else if (rez1)
                            res.json({ 'msg': 'exists' });
                        else
                            category_model_1.default.collection.updateOne({ name: categoryName }, { $push: { subcategories: subcategoryName } }, (err2, rez2) => {
                                if (err2)
                                    console.log(err2);
                                else
                                    res.json({ 'msg': 'ok' });
                            });
                    });
                }
            });
        };
        this.updateCategory = (req, res) => {
            let category = req.body.category;
            let username = req.body.username;
            let productName = req.body.productName;
            product_model_1.default.collection.findOne({ username: username, name: productName }, (err, product) => {
                if (err)
                    console.log(err);
                else if (product) {
                    if (product['category'] != null) {
                        res.json({ 'msg': 'hasCategory/' + product['category'] });
                        return;
                    }
                    else {
                        product_model_1.default.collection.updateOne({ username: username, name: productName }, { $set: { category: category } }, (err, rez) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'msg': 'ok' });
                        });
                    }
                }
            });
        };
        this.getFromStockroom = (req, res) => {
            let username = req.body.username;
            let stockroomName = req.body.stockroomName;
            product_model_1.default.find({ username: username, 'objects.stockroomName': stockroomName }, (err, rez) => {
                if (err)
                    console.log(err);
                else {
                    res.json(rez);
                }
            });
        };
        this.getFromObject = (req, res) => {
            let username = req.body.username;
            let city = req.body.city;
            let streetAndNumber = req.body.streetAndNumber;
            product_model_1.default.find({ username: username, 'objects.city': city, 'objects.streetAndNumber': streetAndNumber }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json(rez);
            });
        };
        this.updateInStockStockroom = (req, res) => {
            let username = req.body.username;
            let code = req.body.code;
            let stockroomName = req.body.stockroomName;
            let newInStock = req.body.newInStock;
            product_model_1.default.collection.updateOne({ username: username, code: code, 'objects.stockroomName': stockroomName }, { $set: { 'objects.$.inStock': newInStock } }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json('ok');
            });
        };
        this.updateInStockObject = (req, res) => {
        };
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map