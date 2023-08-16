"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
class AdminController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_model_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getNonVeirifedUsers = (req, res) => {
            user_model_1.default.find({ status: 'pending' }, (err, users) => {
                if (users)
                    res.json(users);
                else if (err)
                    console.log(err);
            });
        };
        this.updateStatus = (req, res) => {
            let username = req.body.username;
            let status = req.body.status;
            user_model_1.default.collection.updateOne({ username: username }, { $set: { status: status } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json('ok');
            });
        };
        this.registerNewFirm = (req, res) => {
            let username = req.body.username;
            let email = req.body.email;
            let pib = req.body.pib;
            user_model_1.default.findOne({ username: username }, (err, rez1) => {
                if (err)
                    console.log(err);
                else if (rez1)
                    res.json({ 'msg': 'usernameErr' });
                else {
                    user_model_1.default.findOne({ email: email }, (err2, rez2) => {
                        if (err2)
                            console.log(err2);
                        else if (rez2)
                            res.json({ 'msg': 'emailErr' });
                        else {
                            user_model_1.default.findOne({ pib: pib }, (err3, rez3) => {
                                if (err3)
                                    console.log(err3);
                                else if (rez3)
                                    res.json({ "msg": "pibErr" });
                                else {
                                    new user_model_1.default(req.body).save((err4, rez4) => {
                                        if (err4)
                                            console.log(err);
                                        else
                                            res.json({ 'msg': 'ok' });
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
        this.getAllUsers = (req, res) => {
            user_model_1.default.find({ isBuyer: false }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json(rez);
            });
        };
        this.registerNewBuyer = (req, res) => {
            let username = req.body.username;
            user_model_1.default.findOne({ username: username }, (err, rez) => {
                if (err)
                    console.log(err);
                else if (rez) {
                    res.json({ 'msg': 'usernameErr' });
                }
                else {
                    new user_model_1.default(req.body).save((err2, rez2) => {
                        if (err2)
                            console.log(err2);
                        else if (rez2)
                            res.json({ 'msg': 'ok' });
                    });
                }
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map