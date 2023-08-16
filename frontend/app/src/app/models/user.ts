import { Schema, Types } from "mongoose";
import { BankAccount } from "./bank_account";
import { CashRegister } from "./cash_register";
import { Room } from "./room";

export class User {
    name: String;
    surname: String;
    username: String;
    password: String;
    email: String;
    firmName: String;
    phoneNumber: String;
    id: String; // maticni broj firme
    pib: String;
    country: String;
    city: String;
    zipCode: String;
    streetAndNumber: String;
    isShop: Boolean; // prodavnica/ugostitelj
    isBuyer: Boolean; // Kupce dodaje samo admin
    inPDV: Boolean;
    firstLogin: Boolean;
    status: String; // pending/accepted/rejected
    codes: Array<String>;
    bankAccounts: Array<BankAccount>;
    cashRegisters: Array<CashRegister>;
    purchasers: Array<String>;
    identifierNumber: String; // Broj licne karte, samo za kupca
    rooms: Array<Room>;
    picture: String;
    daysToPay: Number;
    rabat: Number;
}