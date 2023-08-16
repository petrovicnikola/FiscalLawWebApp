"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    firmName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    id: {
        type: String
    },
    pib: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    zipCode: {
        type: String
    },
    streetAndNumber: {
        type: String
    },
    isShop: {
        type: Boolean
    },
    isBuyer: {
        type: Boolean
    },
    firstLogin: {
        type: Boolean
    },
    status: {
        type: String
    },
    inPDV: {
        type: Boolean
    },
    codes: {
        type: Array
    },
    bankAccounts: {
        type: Array
    },
    cashRegisters: {
        type: Array
    },
    purchasers: [{
            type: String
        }],
    identifierNumber: {
        type: String
    },
    rooms: {
        type: Array
    },
    picture: {
        type: String
    },
    // Samo za narucioca
    daysToPay: {
        type: Number
    },
    rabat: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('User', User, 'user');
//# sourceMappingURL=user.model.js.map