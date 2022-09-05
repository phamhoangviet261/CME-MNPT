const express = require('express')
const router = express.Router()
 // DO NOT USE IT
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const Account = require('../../models/Account')
// @route POST /api/auth/register
// @desc register new user
// @access public
router.post('/register', async (req, res, next) => {       
    const {name, type} = req.body;    
    // Validation
    if(!name) return res.status(400).json({success: false, message: 'Missing name'})
    try {
        // check existing user
        const user = await Account.findOne({name: name});
        if(user){
            return res.status(400).json({success: false, message: 'Username already taken'});
        }
        
        // fine
        
        // generate salt to hash password
        // const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password

        const customerList = await Account.find({});

        const cus = new Account({id: `MNPT00${customerList.length}`, name: name, typeAccount: type ? type : "User"})
        await cus.save()
        //return token 
        const accessToken = jwt.sign({userId: cus._id}, process.env.ACCESS_TOKEN_SECRET)
        return res.json({success: true, message: 'Register successfully', accessToken, cus})
    } catch (error) {
        console.log("ERROR: ", error);
        return res.status(500).json({success: false, message: "Internal server error"})
    }
})

// @route POST /api/auth/login
// @desc login user
// @access public
router.post('/login', async (req, res, next) => {
    const {username, password} = req.body;
    // console.log("body", req.body);
    // Validation
    if(!username || !password) return res.status(400).json({success: false, message: 'Missing username or password'})

    try {
        // check existing user
        
        const user = await Account.findOne({username: username})
        if(!user){
            return res.status(400).json({success: false, message: 'Incorrect username or password'})
        }

        // found user
        // const hashedPassword = await bcrypt.hash(password, '$2b$10$o/hktJ4aYLFo3zuvTU80mO');
        // console.log("user.password          ", user.password)
        // console.log("hashedPassword login   ", hashedPassword);
        const passwordValid = await bcrypt.compareSync(password, user.password);
        // console.log("passwordValid", passwordValid)
        if(!passwordValid){
            return res.status(400).json({success: false, message: 'Incorrect username or password'})
        }

        //return token 
        const accessToken = "Bearer " + jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        return res
        .cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 10000,
          })
        .status(200)
        .json({success: true, message: 'Logged in successfully', accessToken, user})
    } catch (error) {
        console.log("ERROR: ", error);
        return res.status(500).json({success: false, message: "Internal server error"})
    }
})


router.post('/changePassword', async (req, res, next) => {
    try {
        const {phoneNumber, oldPassword, newPassword} = req.body
        const account = await Account.findOne({phoneNumber: phoneNumber});
        if(!account){
            return res.status(200).json({success: false, message: 'Phone number not found'})
        }

        const hashedOldPassword = await bcrypt.hash(oldPassword, '$2b$10$o/hktJ4aYLFo3zuvTU80mO');
        if(account.password !== hashedOldPassword){
            return res.status(200).json({success: false, message: 'Old password is incorrect'})
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, '$2b$10$o/hktJ4aYLFo3zuvTU80mO');
        await Account.findOneAndUpdate({phoneNumber: phoneNumber}, {password: hashedNewPassword});

        const newAccount = await Account.findOne({phoneNumber: phoneNumber});
        return res.status(200).json({success: true, data: newAccount, message: 'New password is saved successfully'});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors});
    }
    
})

module.exports = router