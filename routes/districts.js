const express = require('express');
const router = express.Router();
const District = require('../models/districts');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newDistrict = new District({
        district_name:req.body.district_name,
        state_id: req.body.state_id
    });
    newDistrict.save((err, doc) => {
        if (err) {
            res.json({
                error: true,
                msg: 'Failed to Create District: ' + err
            });
        } else {
            res.json({
                error: false,
                msg: 'District Created'
            });
        }
    });
});

router.get('/',(req,res)=> {
    District.find({},(err,docs)=> {
        res.send(docs);
    })
})

router.post('/update/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var newDistrict = {
        district_name: req.body.district_name,
        state_id: req.body.state_id
    };
    District.findByIdAndUpdate(req.params.id, { $set: newDistrict },{new:true},(err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "District Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update District" + err });
        }
    });
})

router.post('/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    District.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Deleted District' });
        } else {
            res.json({ error: true, msg: "Failed to Delete District" });
        }
    });
});

module.exports = router;