import * as express from 'express';
import User from '../models/user.model';
import Stockroom from '../models/stockroom.model';

export class UserController{
    register = (req: express.Request, res: express.Response) => {
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

        User.findOne({username: username}, (err, user) => {
            if (user){
                res.json({message: 'usernameErr'});
                return;
            }

            User.findOne({email:email}, (err1, user1) => {
                if (user1){
                    res.json({message:'emailErr'});
                    return;
                }


                let newUser = new User({
                    "name": name,
                    "surname": surname,
                    "username": username,
                    "password": password,
                    "email": email,
                    "firmName": firmName,
                    "phoneNumber": phoneNumber,
                    "id" : id,
                    "pib" : pib,
                    "country": country,
                    "city": city,
                    "zipCode": zipCode,
                    "streetAndNumber": streetAndNumber,
                    "status" : "pending",
                    "isShop" : false,
                    "isBuyer": false,
                    "inPDV" : false,
                    "firstLogin": true,
                    "codes" : [],
                    "bankAccounts": [],
                    "cashRegisters": [],
                    "rooms" : [],
                    "purchasers": [],
                    "daysToPay": 0,
                    "rabat" : 0
                });
        
                newUser.save().then(user => {
                    res.status(200).json({message : "ok"});
                }).catch(err => {
                    res.json({message: "notOk"});
                });
            })

        })
    }

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        User.findOne({'username': username, 'password': password}, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        })

    }

    updatePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let newPassword = req.body.newPassword;

        User.findOne({'username': username, 'password': password}, (err, user) => {
            if (err){
                console.log(err);
            }
            else if (user == null){
                res.json({'message':'passwordErr'});
            }
            else {
                console.log(newPassword);
                User.collection.updateOne({username: username}, {$set : {password: newPassword}}, (err, rez) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({'message': 'ok'});
                })
            }
        })
    }

    updateData = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let isShop = req.body.isShop;
        let inPDV = req.body.inPDV;
        let codes = req.body.codes;
        let bankAccounts = req.body.bankAccounts;
        let cashRegisters = req.body.cashRegisters;
        let stockrooms = req.body.stockrooms;

        User.collection.updateOne({'username': username},
        {$set: {isShop: isShop, inPDV: inPDV, codes: codes,
        bankAccounts: bankAccounts, cashRegisters: cashRegisters, firstLogin: false}}, (err, rez) => {
            if (err)
                console.log(err);
            else{
                Stockroom.insertMany(stockrooms).then((val) => {
                    res.json({"message": "ok"});
                });
            }
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.findOne({username: username}, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        })
    }

    registerPurchaser = (req: express.Request, res: express.Response) => {
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

            User.findOne({email:email}, (err1, user1) => {
                if (user1){
                    res.json({message:'emailErr'});
                    return;
                }

                console.log("OVDE")

                let newUser = new User({
                    "name": name,
                    "surname": surname,
                    "username": username,
                    "password": password,
                    "email": email,
                    "firmName": firmName,
                    "phoneNumber": phoneNumber,
                    "id" : id,
                    "pib" : pib,
                    "country": country,
                    "city": city,
                    "zipCode": zipCode,
                    "streetAndNumber": streetAndNumber,
                    "status" : "pending",
                    "isShop" : false,
                    "isBuyer": false,
                    "inPDV" : false,
                    "firstLogin": true,
                    "codes" : [],
                    "bankAccounts": [],
                    "cashRegisters": [],
                    "daysToPay": daysToPay,
                    "rabat" : rabat
                });
        
                newUser.save().then(user => {
                    console.log(user);
                    res.status(200).json(user);
                }).catch(err => {
                    console.log(err);
                    res.json({message: "notOk"});
                });
            })
    }
}