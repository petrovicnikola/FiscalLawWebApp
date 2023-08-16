"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const stockroom_model_1 = __importDefault(require("../models/stockroom.model"));
class UserController {
    constructor() {
        this.register = (req, res) => {
            let name = req.body.name;
            let surname = req.body.surname;
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            let firmName = req.body.firmName;
            let phoneNumber = req.body.phoneNumber;
            let id = req.body.id;
            let pib = req.body.pib;
            let country = req.body.country;
            let city = req.body.city;
            let zipCode = req.body.zipCode;
            let streetAndNumber = req.body.streetAndNumber;
            user_model_1.default.findOne({ username: username }, (err, user) => {
                if (user) {
                    res.json({ message: 'usernameErr' });
                    return;
                }
                user_model_1.default.findOne({ email: email }, (err1, user1) => {
                    if (user1) {
                        res.json({ message: 'emailErr' });
                        return;
                    }
                    let newUser = new user_model_1.default({
                        "name": name,
                        "surname": surname,
                        "username": username,
                        "password": password,
                        "email": email,
                        "firmName": firmName,
                        "phoneNumber": phoneNumber,
                        "id": id,
                        "pib": pib,
                        "country": country,
                        "city": city,
                        "zipCode": zipCode,
                        "streetAndNumber": streetAndNumber,
                        "status": "pending",
                        "isShop": false,
                        "isBuyer": false,
                        "inPDV": false,
                        "firstLogin": true,
                        "codes": [],
                        "bankAccounts": [],
                        "cashRegisters": [],
                        "rooms": [],
                        "purchasers": [],
                        "daysToPay": 0,
                        "rabat": 0
                    });
                    newUser.save().then(user => {
                        res.status(200).json({ message: "ok" });
                    }).catch(err => {
                        res.json({ message: "notOk" });
                    });
                });
            });
        };
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
        this.updatePassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let newPassword = req.body.newPassword;
            user_model_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else if (user == null) {
                    res.json({ 'message': 'passwordErr' });
                }
                else {
                    console.log(newPassword);
                    user_model_1.default.collection.updateOne({ username: username }, { $set: { password: newPassword } }, (err, rez) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
            });
        };
        this.updateData = (req, res) => {
            let username = req.body.username;
            let isShop = req.body.isShop;
            let inPDV = req.body.inPDV;
            let codes = req.body.codes;
            let bankAccounts = req.body.bankAccounts;
            let cashRegisters = req.body.cashRegisters;
            let stockrooms = req.body.stockrooms;
            user_model_1.default.collection.updateOne({ 'username': username }, { $set: { isShop: isShop, inPDV: inPDV, codes: codes,
                    bankAccounts: bankAccounts, cashRegisters: cashRegisters, firstLogin: false } }, (err, rez) => {
                if (err)
                    console.log(err);
                else {
                    stockroom_model_1.default.insertMany(stockrooms).then((val) => {
                        res.json({ "message": "ok" });
                    });
                }
            });
        };
        this.getUser = (req, res) => {
            let username = req.body.username;
            user_model_1.default.findOne({ username: username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.registerPurchaser = (req, res) => {
            let name = req.body.name;
            let surname = req.body.surname;
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            let firmName = req.body.firmName;
            let phoneNumber = req.body.phoneNumber;
            let id = req.body.id;
            let pib = req.body.pib;
            let country = req.body.country;
            let city = req.body.city;
            let zipCode = req.body.zipCode;
            let streetAndNumber = req.body.streetAndNumber;
            let daysToPay = req.body.daysToPay;
            let rabat = req.body.rabat;
            user_model_1.default.findOne({ email: email }, (err1, user1) => {
                if (user1) {
                    res.json({ message: 'emailErr' });
                    return;
                }
                console.log("OVDE");
                let newUser = new user_model_1.default({
                    "name": name,
                    "surname": surname,
                    "username": username,
                    "password": password,
                    "email": email,
                    "firmName": firmName,
                    "phoneNumber": phoneNumber,
                    "id": id,
                    "pib": pib,
                    "country": country,
                    "city": city,
                    "zipCode": zipCode,
                    "streetAndNumber": streetAndNumber,
                    "status": "pending",
                    "isShop": false,
                    "isBuyer": false,
                    "inPDV": false,
                    "firstLogin": true,
                    "codes": [],
                    "bankAccounts": [],
                    "cashRegisters": [],
                    "daysToPay": daysToPay,
                    "rabat": rabat
                });
                newUser.save().then(user => {
                    console.log(user);
                    res.status(200).json(user);
                }).catch(err => {
                    console.log(err);
                    res.json({ message: "notOk" });
                });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map