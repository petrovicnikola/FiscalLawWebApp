import mongoose from 'mongoose'

import Category from './category.model';

const Schema = mongoose.Schema;

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
    type: { // Hrana/pice/sirovina, samo kod ugostitelja
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
        type:Number
    },
    maxWantedAmount:{
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

export default mongoose.model('Product', Product, 'product');