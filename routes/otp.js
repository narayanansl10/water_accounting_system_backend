const express = require('express');
const router = express.Router();
const OTP = require('../models/otp');

router.post('/create', (req, res, next) => {
    let newOTP = new OTP({
        otp: "",
        phone_number: req.body.phone_number
    });
    var digits = '0123456789';
    let OTPg = '';
    for (let i = 0; i < 4; i++) {
        OTPg += digits[Math.floor(Math.random() * 10)];
    }
    newOTP.otp = OTPg
    newOTP.save((err, doc) => {
        if (err) {
            res.json({
                error: true,
                msg: 'Failed to Create OTP : ' + err
            });
        } else {
            res.json({
                error: false,
                msg: 'OTP reported'
            });
        }
    });
});

router.get('/:phone_number', (req, res) => {
    OTP.find({ phone_number: req.params.phone_number }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.json({ "error": err });
        }
    })
})

router.post('/delete/:phone_number', (req, res) => {
    OTP.findOneAndRemove(req.params.phone_number, (err, docs) => {
        if (err) {
            res.json({
                error: true,
                msg: "Error While resolving"
            })
        }
        else {
            res.json({
                error: false,
                msg: "OTP Deleted"
            })
        }
    })
})

module.exports = router;
