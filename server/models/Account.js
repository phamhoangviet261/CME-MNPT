const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AccountSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: String, 
        required: true,
    },
    typeAccount: {
        type: String,
        enum: ['Admin', 'User'],
    },
    info:{
        type: Array
    },
    status: String
}, { timestamps: true })

module.exports = mongoose.model('users', AccountSchema)