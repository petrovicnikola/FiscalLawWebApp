import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
    inTaxes:{
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

export default mongoose.model('Bill', Bill, 'bill');