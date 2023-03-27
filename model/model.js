const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    food: {
        required: true,
        type: String
    },
    qty: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Data', dataSchema)