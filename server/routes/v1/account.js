const express = require('express')
const router = express.Router()
const axios = require('axios');

const Account = require('../../models/Account')

router.get('/', async (req, res, next) => {
    try {
        const data = await Account.find({isActive: true});
        return res.status(200).json({success: true, data});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

router.get('/404', async (req, res, next) => {
    try {
        
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

module.exports = router;