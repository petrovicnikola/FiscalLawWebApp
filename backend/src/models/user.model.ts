import mongoose, { Types } from 'mongoose'

const Schema = mongoose.Schema;

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
    identifierNumber: { // Broj licne karte, za kupca
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

export default mongoose.model('User', User, 'user');