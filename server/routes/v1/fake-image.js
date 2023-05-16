const express = require('express')
const router = express.Router()
function wait5sec (waitTime) {

    return new Promise ((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, waitTime);
    });
    
  }
router.get('/', async (req, res, next) => {
    try {
        return res.status(200).json({success: true, data: "404"});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

router.post('/', async (req, res, next) => {
    try {
        const t = Math.floor(Math.random() * 5) + 5;
        await wait5sec(t*1000);  // wait function
        console.log({data: req.body.id})
        return res.status(200).json({success: true, data: [
            {
                "name": "1.png",
                "contentType": "image/png",
                "url": "https://mogul-upload-development.s3-accelerate.amazonaws.com/property/image/abc/image-01.png?AWSAccessKeyId=AKIAYR3DQWOKXYDVOJLN&Content-Type=image%2Fpng&Expires=1677402882&Signature=dJbPlri7UXbVHQ9zGI86G%2FFWh3c%3D"
            },
            {
                "name": "2.png",
                "contentType": "image/png",
                "url": "https://mogul-upload-development.s3-accelerate.amazonaws.com/property/image/abc/image-02.png?AWSAccessKeyId=AKIAYR3DQWOKXYDVOJLN&Content-Type=image%2Fpng&Expires=1677402882&Signature=iTEuPA2okADwX8SIHD4PQwuOlQk%3D"
            },
            {
                "name": "3.png",
                "contentType": "image/png",
                "url": "https://mogul-upload-development.s3-accelerate.amazonaws.com/property/image/abc/image-03.png?AWSAccessKeyId=AKIAYR3DQWOKXYDVOJLN&Content-Type=image%2Fpng&Expires=1677402883&Signature=460Ap1PNfqccpUru1kT1ZGTUCQg%3D"
            }
        ]});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

router.post('/aws', async (req, res, next) => {
    try {
        const t = Math.floor(Math.random() * 5) + 5;
        await wait5sec(t*1000);  // wait function
        console.log({data: req.body.id})
        return res.status(200).json({success: true, data: "POSTED TO S3"});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

module.exports = router;