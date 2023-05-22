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

router.get('/off', async (req, res, next) => {
    try {
        const data = await Account.find({isActive: false});
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

router.post("/active", async (req, res, next) => {
    try {
        const {id} = req.body;
        const data = await Account.updateOne({id}, {isActive: true})
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
})

router.post("/de-active", async (req, res, next) => {
    try {
        const {id} = req.body;
        const data = await Account.updateOne({id}, {isActive: false})
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
})

router.post("/new", async (req, res, next) => {
    try {
        const {id,name} = req.body;
        const data = await Account.insertMany({id,name,isActive: true})
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
})

module.exports = router;