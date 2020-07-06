const express = require('express');
const router = express.Router();
const LoginDetails = require('../models/logindetails');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newLogin = new LoginDetails({
        user_name: req.body.user_name,
        phonenumber: req.body.phonenumber,
        password: req.body.password,
        aadhar_number: req.body.aadhar_number,
        admin_role:req.body.admin_role
    });

    LoginDetails.addLogin(newLogin, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to register Login' + err
            });
        } else {
            res.json({
                success: true,
                msg: 'Login registered'
            });
        }
    });
})

router.get('/',(req,res)=> {
    LoginDetails.find({},(err,docs)=> {
        res.send(docs);
    })
})

router.post('/update/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var newLogin = {
        user_name: req.body.user_name,
        phonenumber: req.body.phonenumber,
        password: req.body.password,
        aadhar_number: req.body.aadhar_number,
        admin_role: req.body.admin_role
    };
    
    LoginDetails.findByIdAndUpdate(req.params.id, { $set: newLogin }, {new:true},(err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "Login Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update Login" + err });
        }
    });
})

router.post('/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    LoginDetails.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Deleted Login' });
        } else {
            res.json({ error: true, msg: "Failed to Delete Login" });
        }
    });
});

module.exports=router;