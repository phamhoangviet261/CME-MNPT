const express = require('express')
const router = express.Router()
const axios = require('axios');

const Invoice = require('../../models/Invoice')
const Account = require('../../models/Account')

router.get('/', async (req, res, next) => {
    try {
        const data = await Invoice.find({});
        let fakeData = JSON.parse(JSON.stringify(data));
        for(let i = 0; i < fakeData.length; i++){
            let item = fakeData.receiver;
        }
        return res.status(200).json({success: true, data});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});


router.post('/', async (req, res, next) => {
    try {
        const {payer, receiver, total, purpose} = req.body;
        if(!payer || !receiver || !total || !purpose){
            return res.status(400).json({success: false, message: "Invalid params"});
        }
        const invoices = await Invoice.find({});
        var today = new Date();
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 2).padStart(2, '0'); //January is 0!
        var year = today.getFullYear();

        let r = []
        for(let i = 0; i < receiver.length; i++) {
            r.push(`${receiver[i]}-${Math.ceil(total/receiver.length)}`)
        }

        let detailInMonth = {};   
        let totalAgain = 0;     
        for(const re of receiver) {
            detailInMonth[re] = 0 - Math.ceil(total/receiver.length);
            totalAgain+=Math.ceil(total/receiver.length)
        }
        
        detailInMonth[payer] = detailInMonth[payer] ? detailInMonth[payer] + parseInt(totalAgain) : parseInt(totalAgain);
        let idGen = Math.random().toString().slice(2,12);
        const cus = new Invoice({id: `inv${idGen}`, payer, receiver: detailInMonth, total, purpose, day, month, year})
        await cus.save()

        return res.status(200).json({success: true, data: cus});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

router.get('/month/:month/year/:year', async (req, res, next) => {
    try {
        const {month, year} = req.params;
        const invoices = await Invoice.find({month: month, year: year});
        let totalInMonth = {};
        let detailInMonth = []
        const accounts = (await Account.find({})).map(item => {
            totalInMonth[item.id] = 0;
            return {id: item.id, name: item.name};
        });

        for(const invo of invoices) {
            let obj = {}
            obj[invo.payer] = invo.total;
            for(const re in invo.receiver){
                obj[re] = invo.receiver[re];
            }
            detailInMonth.push({
                payer: invo.payer,
                tt: obj,
                time: `${invo.day}/${invo.month}/${invo.year}`,
                total: invo.total
            })
        }

        for(const item of detailInMonth) {
            for(const i in item.tt){
                totalInMonth[i] += item.tt[i]
            }
        }

        return res.status(200).json({success: true, message: `Invoices in month ${month}, year ${year}`, accounts, totalInMonth, detailInMonth, data: invoices});        
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

router.get('/delete', async (req, res, next) => {
    try {
        const {invoiceId} = req.body;
        if(!invoiceId) return res.status(200).json({success: false, data: []});
        const inv = await Invoice.findOneAndDelete({id: invoiceId});
        return res.status(200).json({success: true, data: inv});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

router.post('/deleteAll', async (req, res, next) => {
    try {
        const {dataOS, dataBrowser} = req.body;
        const acc = await Account.findOne({id: 'MNPT000'});
        let time = new Date();
        let info = JSON.parse(JSON.stringify(acc.info))
        await Account.findOneAndUpdate({id: 'MNPT000'}, {info: info.push({time, data: dataOS+'---'+dataBrowser})});
        await Invoice.deleteMany();

        let a = await Account.find({});
        return res.status(200).json({success: true, data: a, message: "Delete all invoices", info});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

router.post('/delete-month', async (req, res, next) => {
    try {
        const {month, year} = req.body;
        if(!month) return res.status(400).json({success: false, message: 'Invalid month'});

       await Invoice.deleteMany({month: month, year: year})
        return res.status(200).json({success: true, message: `Delete all invoices in month ${month}, year ${year} `});
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