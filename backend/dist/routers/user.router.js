"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
const multer = require('multer');
var path = require('path');
//let upload = multer({ storage: storage })
//let upload = multer({dest: './uploads'})
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        let filename = req.body.username;
        req.body.file = filename;
        cb(null, filename);
    }
});
var upload = multer({ storage: storage });
userRouter.post('/register', upload.single('img'), function (req, res) {
    req.body.picture = req.body.file;
    console.log(req.body.picture);
    new user_controller_1.UserController().register(req, res);
});
userRouter.route('/login').post((req, res) => {
    new user_controller_1.UserController().login(req, res);
});
userRouter.route('/updatePassword').post((req, res) => {
    new user_controller_1.UserController().updatePassword(req, res);
});
userRouter.route('/updateData').post((req, res) => {
    new user_controller_1.UserController().updateData(req, res);
});
userRouter.route('/getUser').post((req, res) => {
    new user_controller_1.UserController().getUser(req, res);
});
userRouter.route('/registerPurchaser').post((req, res) => {
    new user_controller_1.UserController().registerPurchaser(req, res);
});
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map