"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Product = new Schema({
    code: {
        type: String
    },
    name: {
        type: String
    },
    unitOfMeasure: {
        type: String
    },
    tax: {
        type: Number
    },
    type: {
        type: String
    },
    // Neobavezni podaci
    countryOfOrigin: {
        type: String
    },
    foreignName: {
        type: String
    },
    barCode: {
        type: String
    },
    producer: {
        type: String
    },
    customTariff: {
        type: Number
    },
    ecoTax: {
        type: Boolean
    },
    akciza: {
        type: Boolean
    },
    minWantedAmount: {
        type: Number
    },
    maxWantedAmount: {
        type: Number
    },
    description: {
        type: String
    },
    declaration: {
        type: String
    },
    username: {
        type: String
    },
    objects: {
        type: Array
    },
    category: {
        type: String
    },
    hasImg: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Product', Product, 'product');
//# sourceMappingURL=product.model.js.map