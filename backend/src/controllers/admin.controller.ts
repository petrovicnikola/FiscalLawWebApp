import * as express from 'express';
import { Request, Response } from 'express-serve-static-core';
import User from '../models/user.model';

export class AdminController{
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

    getNonVeirifedUsers = (req: express.Request, res: express.Response) => {
        User.find({status: 'pending'}, (err, users) => {
            if (users)
                res.json(users);
            else if (err)
                console.log(err);
        })
    }

    updateStatus = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let status = req.body.status;

        User.collection.updateOne({username: username}, {$set: {status: status}}, (err, resp) => {
            if (err)
                console.log(err);
            else
                res.json('ok');
        })
    }

    registerNewFirm = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let email = req.body.email;
        let pib = req.body.pib;

        User.findOne({username: username}, (err, rez1) => {
            if (err)
                console.log(err);
            else if(rez1)
                res.json({'msg': 'usernameErr'});
            else {
                User.findOne({email: email}, (err2, rez2) => {
                    if (err2)
                        console.log(err2);
                    else if (rez2)
                        res.json({'msg':'emailErr'});
                    else {
                        User.findOne({pib: pib}, (err3, rez3) => {
                            if (err3)
                                console.log(err3);
                            else if (rez3)
                                res.json({"msg" : "pibErr"});
                            else {
                                new User(req.body).save((err4, rez4) => {
                                    if (err4)
                                        console.log(err);
                                    else
                                        res.json({'msg' :'ok'});
                                })
                            }
                        })
                    }
                })
            }
        })

    }

    getAllUsers = (req: express.Request, res: express.Response) => {
        User.find({isBuyer: false}, (err, rez) => {
            if (err)
                console.log(err);
            else
                res.json(rez);
        })
    }

    registerNewBuyer = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        
        User.findOne({username: username}, (err, rez) => {
            if (err)
                console.log(err)
            else if (rez){
                res.json({'msg':'usernameErr'});
            }
            else {
                new User(req.body).save((err2, rez2) => {
                    if (err2)
                        console.log(err2);
                    else if (rez2)
                        res.json({'msg':'ok'});
                })
            }
        })
    }
}