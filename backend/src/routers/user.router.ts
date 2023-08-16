import express, { Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();


const multer = require('multer');
var path = require('path')

//let upload = multer({ storage: storage })

//let upload = multer({dest: './uploads'})

var storage = multer.diskStorage({

    destination: function (req: any, file: any, cb: (arg0: any, arg1: string) => void) {
  
      cb(null, './uploads')
    },
  
  
    filename: function (req: Request, file: any, cb: (arg0: any, arg1: string) => void) {
  
      let filename = req.body.username;
       req.body.file = filename
  
      cb(null, filename)
    }
  })
  
  var upload = multer({ storage: storage })


userRouter.post('/register', upload.single('img'),
        function(req, res){
        req.body.picture = req.body.file
        console.log(req.body.picture)
        new UserController().register(req, res);
    }
)

userRouter.route('/login').post(
    (req, res) => {
        new UserController().login(req, res);
    }
)

userRouter.route('/updatePassword').post(
    (req, res) => {
        new UserController().updatePassword(req, res);
    }
)

userRouter.route('/updateData').post(
    (req, res) => {
        new UserController().updateData(req, res);
    }
)

userRouter.route('/getUser').post(
    (req, res) => {
        new UserController().getUser(req, res);
    }
)

userRouter.route('/registerPurchaser').post(
    (req, res) => {
        new UserController().registerPurchaser(req, res);
    }
)

export default userRouter;