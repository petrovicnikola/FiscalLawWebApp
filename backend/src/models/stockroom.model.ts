import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Stockroom = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    username: {
        type: String
    }
});

export default mongoose.model('Stockroom', Stockroom, 'stockroom');