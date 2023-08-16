"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const productRouter = express_1.default.Router();
const multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        let filename = req.body.username + "" + req.body.code;
        req.body.file = filename;
        cb(null, filename);
    }
});
var upload = multer({ storage: storage });
productRouter.post('/addNewProduct', upload.single('img'), function (req, res) {
    new product_controller_1.ProductController().addNewProduct(req, res);
});
productRouter.route('/getProducts').post((req, res) => {
    new product_controller_1.ProductController().getProducts(req, res);
});
productRouter.route('/deleteProduct').post((req, res) => {
    new product_controller_1.ProductController().deleteProduct(req, res);
});
productRouter.route('/updateProduct').post((req, res) => {
    new product_controller_1.ProductController().updateProduct(req, res);
});
productRouter.route('/addToStockroom').post((req, res) => {
    new product_controller_1.ProductController().addToStockroom(req, res);
});
productRouter.route('/getFromStockroom').post((req, res) => {
    new product_controller_1.ProductController().getFromStockroom(req, res);
});
productRouter.route('/addToObject').post((req, res) => {
    new product_controller_1.ProductController().addToObject(req, res);
});
productRouter.route('/getFromObject').post((req, res) => {
    new product_controller_1.ProductController().getFromObject(req, res);
});
productRouter.route('/getAllCategories').get((req, res) => {
    new product_controller_1.ProductController().getAllCategories(req, res);
});
productRouter.route('/addNewCategory').post((req, res) => {
    new product_controller_1.ProductController().addNewCategory(req, res);
});
productRouter.route('/addNewSubcategory').post((req, res) => {
    new product_controller_1.ProductController().addNewSubcategory(req, res);
});
productRouter.route('/updateCategory').post((req, res) => {
    new product_controller_1.ProductController().updateCategory(req, res);
});
productRouter.route('/updateInStockStockroom').post((req, res) => {
    new product_controller_1.ProductController().updateInStockStockroom(req, res);
});
productRouter.route('/updateInStockObject').post((req, res) => {
    new product_controller_1.ProductController().updateInStockObject(req, res);
});
exports.default = productRouter;
//# sourceMappingURL=product.router.js.map