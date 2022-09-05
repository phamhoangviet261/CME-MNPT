const express = require('express')
const router = express.Router()
const axios = require('axios');

const Invoice = require('../../models/Invoice')

router.get('/', async (req, res, next) => {
    try {
        const data = await Invoice.find({});

        return res.status(200).json({success: true, data});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});


router.post('/', async (req, res, next) => {
    try {
        const {payer, receiver, total, purpose} = req.body;
        const invoices = await Invoice.find({});
        var today = new Date();
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var year = today.getFullYear();

        let r = []
        for(let i = 0; i < receiver.length; i++) {
            r.push(`${receiver[i]}-${total/receiver.length}`)
        }

        const cus = new Invoice({id: `inv${invoices.length}`, payer, receiver: r, total, purpose, day, month, year})
        await cus.save()

        return res.status(200).json({success: true, data: cus});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

router.get('/month/:month', async (req, res, next) => {
    try {
        const {month} = req.params;
        const invoices = await Invoice.find({month: month});
        return res.status(200).json({success: true, message: `Invoices in month ${month}`, data: invoices});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});


router.get('/404', async (req, res, next) => {
    try {
        return res.status(200).json({success: true, data: "404"});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

module.exports = router;