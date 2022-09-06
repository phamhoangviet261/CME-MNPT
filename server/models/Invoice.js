const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AccountSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    payer: {
        type: String
    },
    receiver:{
        type: Object
    },
    total: Number,
    purpose: String,
    day: Number,
    month: Number,
    year: Number
}, { timestamps: true })

module.exports = mongoose.model('invoices', AccountSchema)