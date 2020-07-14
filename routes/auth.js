const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const LoginDetails=require('../models/logindetails');
const User = require('../models/userdetails');
const cors = require('cors');
var ObjectId = require('mongoose').Types.ObjectId;
//Login
router.post('/authenticate', cors(),(req, res, next) => {
    const phone_number = req.body.phone_number;
    const password = req.body.password;
    console.log(phone_number);
    LoginDetails.find({phonenumber:phone_number}, (err, docs) => {
        if (err) throw err;
        else if (docs.length == 0) {
            return res.json({ success: false, phonenumber: false, msg: 'ID DOES NOT EXIST'});
        }
        else {
            LoginDetails.comparePassword(password, docs[0].password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({ data: docs[0] }, config.application.secret, {
                        expiresIn: 604800 // 1 week
                    });
                    res.json({
                        success: true,
                        phonenumber: phone_number,
                        token: 'JWT ' + token,
                        msg: 'YOU ARE LOGGED IN'
                    })
                } else {
                    return res.json({ success: false, password: false, msg: 'WRONG PASSWORD' });
                }
            });
        }
    });
});

// Get Current User Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ profile: req.user, success: true });
});

module.exports = router;
