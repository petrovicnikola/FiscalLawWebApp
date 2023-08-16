import * as express from 'express';
import { Request, Response } from 'express-serve-static-core';
import User from '../models/user.model';
import Stockroom from '../models/stockroom.model';
import { Types } from 'mongoose';
import Bill from '../models/bill.model';
import userModel from '../models/user.model';

export class FirmController{

    updateData = (req: express.Request, res: express.Response) => {
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

        User.collection.updateOne({username: username}, {$set: {name: name, surname:surname, email:email, phoneNumber:phoneNumber, firmName: firmName, id: id,
        pib:pib, country:country, city: city, zipCode: zipCode, streetAndNumber: streetAndNumber, inPDV: inPDV, isShop: isShop, codes:codes}}, (err, rez) => {
            if (err)
            console.log(err);
            else
                res.json({'message': 'ok'});
        })
    }

    getBankAccounts = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.collection.findOne({username: username}, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user['bankAccounts']);
        })
    }

    deleteBankAccount = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let bankAccounts = req.body.bankAccounts;

        User.collection.updateOne({username: username}, {$set: {bankAccounts: bankAccounts}}, (err, rez) => {
            if (err)
                console.log(err);
            else {
                User.findOne({username: username}, (err, user) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(user);
                })
            }
        })       
    }

    getStockrooms = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        Stockroom.find({username: username}, (err, stockrooms) => {
            if (err)
                console.log(err);
            else
                res.json(stockrooms);
        })
    }

    deleteStockroom = (req: express.Request, res:express.Response) => {
        let username = req.body.username;
        let _id= req.body._id;
        let name = req.body.name;

        Stockroom.collection.deleteOne({name: name, username: username}, (err, rez)=> {
            if (err)
                console.log(err);
            else
                res.json("ok");
        })
    }

    updateStockroom = (req: express.Request, res:express.Response) => {
        let username = req.body.username;
        let _id= req.body._id;
        let name = req.body.name;
        let newName = req.body.newName;

        Stockroom.collection.updateOne({name: name, username: username}, {$set: {name: newName}}, (err, rez)=> {
            if (err)
                console.log(err);
            else
                res.json("ok");
        })
    }

    getCashRegisters = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.collection.findOne({username: username}, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user['cashRegisters']);
        })
    }

    deleteCashRegister = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let cashRegisters = req.body.cashRegisters;

        User.collection.updateOne({username: username}, {$set: {cashRegisters: cashRegisters}}, (err, rez) => {
            if (err)
                console.log(err);
            else {
                User.findOne({username: username}, (err, user) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(user);
                })
            }
        })           
    }

    findFirmWithPIB = (req: express.Request, res: express.Response) => {
        let pib = req.body.pib;

        User.findOne({pib: pib}, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        })
    }

    addNewPurchaser = (req: express.Request, res: express. Response) => {
        let username = req.body.username;
        let purchaser = req.body.purchaser;

        User.updateOne({username: username}, {$push: {purchasers: purchaser}}, (err, raw) => {
            if (err)
                console.log(err);
            else
                res.json({'message' : 'ok'});
        })
    }

    getUserAndPurchasers = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        
        User.findOne({username: username}, (err, user) => {
            if (err)
                console.log(err);
            else {
                user.populate('purchasers', (err, user) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(user);
                })
            }
        })
    }

    getPurchaser = (req: express.Request, res: express.Response) => {
        let pib = req.body.pib;

        User.findOne({pib: pib}, (err, user) => {
            if (err)
                console.log(err)
            else
                res.json(user);
        })
    }

    addNewBill = (req: express.Request, res: express.Response) => {
        new Bill(req.body).save((err, rez) => {
            if (err)
                console.log(err);
            else
                res.json(rez);
        })
    }

    getAllBills = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        Bill.find({username: username}, (err, rez) => {
            if (err)
                console.log(err);
            else
                res.json(rez);
        })
    }

    getBills = (req: express.Request, res: express.Response) => {
        Bill.find((err, bills) => {
            if (err)
                console.log(err);
            else
                res.json(bills);
        })
    }

    getBillsForBuyer = (req: express.Request, res: express.Response) => {
        let identifierNumber = req.body.identifierNumber;

        Bill.find({identifierNumber: identifierNumber}, (err, rez) => {
            if (err)
                console.log(err);
            else
                res.json(rez);
        })
    }

    getIdentifierNumber = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        Bill.findOne({username: username}, (err, rez) => {
            if (err)
                console.log(err);
            else
                res.json(rez.get('identifierNumber'));
        })
    }

    getRooms = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.findOne({username: username}, (err, rez) => {
            if (err)
                console.log(err);
            else
                res.json(rez.get('rooms'));
        })
    }

    addRoom = (req: express.Request, res:express. Response) => {
        let username = req.body.username;
        let name = req.body.name;

        let room = {
            name: name,
            tables: new Array()
        }

        User.collection.updateOne({username: username}, {$push: {rooms: room}}, (err, rez) => {
            if (err)
                console.log(err);
            else
                res.json('ok');
        })
    }

    updateTables = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let name = req.body.name;
        let tables = req.body.tables;
        console.log("Ovde");
        User.collection.updateOne({username: username, "rooms.name":name}, {$set: {"rooms.$.tables": tables}}, (err, rez) => {
            if (err)
                console.log(err);
            else{
                res.json(rez);
                console.log(rez);
            }
        })
    }
}