const express = require('express');
const router = express.Router();
const UserDetails = require('../models/userdetails');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newUser = new UserDetails({
        login_details:req.body.login_details,
        taluk_name:req.body.taluk_name,
        village_name:req.body.village_name,
        area_of_plantation:req.body.area_of_plantation,
        number_of_crops:req.body.number_of_crops,
        crop_details:req.body.crop_details
    });
    newUser.save((err, doc) => {
        if (err) {
            res.json({
                error: true,
                msg: 'Failed to Create User: ' + err
            });
        } else {
            res.json({
                error: false,
                msg: 'User Created'
            });
        }
    });
});

router.get('/',(req,res)=> {
    UserDetails.find({},(err,docs)=> {
        res.send(docs);
    })
})

router.post('/update/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var newUser = ({
        login_details:req.body.login_details,
        taluk_name:req.body.taluk_name,
        village_name:req.body.village_name,
        area_of_plantation:req.body.area_of_plantation,
        number_of_crops:req.body.number_of_crops,
        crop_details:req.body.crop_details
    });
    UserDetails.findByIdAndUpdate(req.params.id, { $set: newUser },{new:true},(err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "User Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update User" + err });
        }
    });
})

router.post('/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    UserDetails.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Deleted User' });
        } else {
            res.json({ error: true, msg: "Failed to Delete User" });
        }
    });
});

module.exports = router;