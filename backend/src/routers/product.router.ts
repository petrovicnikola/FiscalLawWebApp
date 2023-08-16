import express, { Request, Response } from 'express';
import { ProductController } from '../controllers/product.controller';

const productRouter = express.Router();

const multer = require('multer');
var path = require('path')


var storage = multer.diskStorage({

    destination: function (req: any, file: any, cb: (arg0: any, arg1: string) => void) {
  
      cb(null, './uploads')
    },
  
  
    filename: function (req: Request, file: any, cb: (arg0: any, arg1: string) => void) {
  
      let filename = req.body.username + "" + req.body.code;
       req.body.file = filename
  
      cb(null, filename)
    }
  })
  
  var upload = multer({ storage: storage })

productRouter.post('/addNewProduct', upload.single('img'),
    function(req, res){
        new ProductController().addNewProduct(req, res);
    }
)

productRouter.route('/getProducts').post(
    (req, res) => {
        new ProductController().getProducts(req, res);
    }
)

productRouter.route('/deleteProduct').post(
    (req, res) => {
        new ProductController().deleteProduct(req, res);
    }
)

productRouter.route('/updateProduct').post(
    (req, res) => {
        new ProductController().updateProduct(req, res);
    }
)

productRouter.route('/addToStockroom').post(
    (req, res) => {
        new ProductController().addToStockroom(req, res);
    }
)

productRouter.route('/getFromStockroom').post(
    (req, res) => {
        new ProductController().getFromStockroom(req, res);
    }
)

productRouter.route('/addToObject').post(
    (req, res) => {
        new ProductController().addToObject(req, res);
    }
)

productRouter.route('/getFromObject').post(
    (req, res) => {
        new ProductController().getFromObject(req, res);
    }
)

productRouter.route('/getAllCategories').get(
    (req, res) => {
        new ProductController().getAllCategories(req, res);
    }
)

productRouter.route('/addNewCategory').post(
    (req, res) => {
        new ProductController().addNewCategory(req, res);
    }
)

productRouter.route('/addNewSubcategory').post(
    (req, res) => {
        new ProductController().addNewSubcategory(req, res);
    }
)

productRouter.route('/updateCategory').post(
    (req, res) => {
        new ProductController().updateCategory(req, res);
    }
)

productRouter.route('/updateInStockStockroom').post(
    (req, res) => {
        new ProductController().updateInStockStockroom(req, res);
    }
)


productRouter.route('/updateInStockObject').post(
    (req, res) => {
        new ProductController().updateInStockObject(req, res);
    }
)

export default productRouter;