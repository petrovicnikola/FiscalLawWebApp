"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Bill = new Schema({
    username: {
        type: String
    },
    money: {
        type: Number
    },
    toPay: {
        type: Number
    },
    inTaxes: {
        type: Number
    },
    billItems: {
        type: Array
    },
    identifierNumber: {
        type: String
    },
    buyerName: {
        type: String
    },
    buyerSurname: {
        type: String
    },
    slipNumber: {
        type: String
    },
    purchaser: {
        type: String
    },
    date: {
        type: Date
    },
    type: {
        type: String // gotovina/kartica/cek/virman
    },
    firmName: {
        type: String
    },
    objectName: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Bill', Bill, 'bill');
//# sourceMappingURL=bill.model.js.map