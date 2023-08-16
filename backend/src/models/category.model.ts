import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Category = new Schema({
    name: {
        type: String
    },
    subcategories: {
        type: Array
    }
});

export default mongoose.model('Category', Category, 'category');