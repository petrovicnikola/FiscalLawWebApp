"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirmController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const stockroom_model_1 = __importDefault(require("../models/stockroom.model"));
const bill_model_1 = __importDefault(require("../models/bill.model"));
class FirmController {
    constructor() {
        this.updateData = (req, res) => {
            let username = req.body.username;
            let name = req.body.name;
            let surname = req.body.surname;
            let email = req.body.email;
            let phoneNumber = req.body.phoneNumber;
            let firmName = req.body.firmName;
            let id = req.body.id;
            let pib = req.body.pib;
            let country = req.body.country;
            let city = req.body.city;
            let zipCode = req.body.zipCode;
            let streetAndNumber = req.body.streetAndNumber;
            let inPDV = req.body.inPDV;
            let isShop = req.body.isShop;
            let codes = req.body.codes;
            user_model_1.default.collection.updateOne({ username: username }, { $set: { name: name, surname: surname, email: email, phoneNumber: phoneNumber, firmName: firmName, id: id,
                    pib: pib, country: country, city: city, zipCode: zipCode, streetAndNumber: streetAndNumber, inPDV: inPDV, isShop: isShop, codes: codes } }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.getBankAccounts = (req, res) => {
            let username = req.body.username;
            user_model_1.default.collection.findOne({ username: username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user['bankAccounts']);
            });
        };
        this.deleteBankAccount = (req, res) => {
            let username = req.body.username;
            let bankAccounts = req.body.bankAccounts;
            user_model_1.default.collection.updateOne({ username: username }, { $set: { bankAccounts: bankAccounts } }, (err, rez) => {
                if (err)
                    console.log(err);
                else {
                    user_model_1.default.findOne({ username: username }, (err, user) => {
                        if (err)
                            console.log(err);
                        else
                            res.json(user);
                    });
                }
            });
        };
        this.getStockrooms = (req, res) => {
            let username = req.body.username;
            stockroom_model_1.default.find({ username: username }, (err, stockrooms) => {
                if (err)
                    console.log(err);
                else
                    res.json(stockrooms);
            });
        };
        this.deleteStockroom = (req, res) => {
            let username = req.body.username;
            let _id = req.body._id;
            let name = req.body.name;
            stockroom_model_1.default.collection.deleteOne({ name: name, username: username }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json("ok");
            });
        };
        this.updateStockroom = (req, res) => {
            let username = req.body.username;
            let _id = req.body._id;
            let name = req.body.name;
            let newName = req.body.newName;
            stockroom_model_1.default.collection.updateOne({ name: name, username: username }, { $set: { name: newName } }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json("ok");
            });
        };
        this.getCashRegisters = (req, res) => {
            let username = req.body.username;
            user_model_1.default.collection.findOne({ username: username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user['cashRegisters']);
            });
        };
        this.deleteCashRegister = (req, res) => {
            let username = req.body.username;
            let cashRegisters = req.body.cashRegisters;
            user_model_1.default.collection.updateOne({ username: username }, { $set: { cashRegisters: cashRegisters } }, (err, rez) => {
                if (err)
                    console.log(err);
                else {
                    user_model_1.default.findOne({ username: username }, (err, user) => {
                        if (err)
                            console.log(err);
                        else
                            res.json(user);
                    });
                }
            });
        };
        this.findFirmWithPIB = (req, res) => {
            let pib = req.body.pib;
            user_model_1.default.findOne({ pib: pib }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.addNewPurchaser = (req, res) => {
            let username = req.body.username;
            let purchaser = req.body.purchaser;
            user_model_1.default.updateOne({ username: username }, { $push: { purchasers: purchaser } }, (err, raw) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.getUserAndPurchasers = (req, res) => {
            let username = req.body.username;
            user_model_1.default.findOne({ username: username }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    user.populate('purchasers', (err, user) => {
                        if (err)
                            console.log(err);
                        else
                            res.json(user);
                    });
                }
            });
        };
        this.getPurchaser = (req, res) => {
            let pib = req.body.pib;
            user_model_1.default.findOne({ pib: pib }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.addNewBill = (req, res) => {
            new bill_model_1.default(req.body).save((err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json(rez);
            });
        };
        this.getAllBills = (req, res) => {
            let username = req.body.username;
            bill_model_1.default.find({ username: username }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json(rez);
            });
        };
        this.getBills = (req, res) => {
            bill_model_1.default.find((err, bills) => {
                if (err)
                    console.log(err);
                else
                    res.json(bills);
            });
        };
        this.getBillsForBuyer = (req, res) => {
            let identifierNumber = req.body.identifierNumber;
            bill_model_1.default.find({ identifierNumber: identifierNumber }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json(rez);
            });
        };
        this.getIdentifierNumber = (req, res) => {
            let username = req.body.username;
            bill_model_1.default.findOne({ username: username }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json(rez.get('identifierNumber'));
            });
        };
        this.getRooms = (req, res) => {
            let username = req.body.username;
            user_model_1.default.findOne({ username: username }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json(rez.get('rooms'));
            });
        };
        this.addRoom = (req, res) => {
            let username = req.body.username;
            let name = req.body.name;
            let room = {
                name: name,
                tables: new Array()
            };
            user_model_1.default.collection.updateOne({ username: username }, { $push: { rooms: room } }, (err, rez) => {
                if (err)
                    console.log(err);
                else
                    res.json('ok');
            });
        };
        this.updateTables = (req, res) => {
            let username = req.body.username;
            let name = req.body.name;
            let tables = req.body.tables;
            console.log("Ovde");
            user_model_1.default.collection.updateOne({ username: username, "rooms.name": name }, { $set: { "rooms.$.tables": tables } }, (err, rez) => {
                if (err)
                    console.log(err);
                else {
                    res.json(rez);
                    console.log(rez);
                }
            });
        };
    }
}
exports.FirmController = FirmController;
//# sourceMappingURL=firm.controller.js.map