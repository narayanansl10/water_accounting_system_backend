const express = require('express');
const router = express.Router();
const WaterInfo = require('../models/waterinfo');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newWaterInfo = new WaterInfo({
        waterbody_name: req.body.waterbody_name,
        taluk_id:  req.body.taluk_id,
        water_available: req.body.water_available
    });
    newWaterInfo.save((err, doc) => {
        if (err) {
            res.json({
                error: true,
                msg: 'Failed to Create WaterInfo: ' + err
            });
        } else {
            res.json({
                error: false,
                msg: 'WaterInfo Created'
            });
        }
    });
});

router.get('/',(req,res)=> {
    WaterInfo.find({},(err,docs)=> {
        res.send(docs);
    })
})

router.post('/update/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var newWaterInfo = {
        waterbody_name: req.body.waterbody_name,
        taluk_id:  req.body.taluk_id,
        water_available: req.body.water_available
    };
    WaterInfo.findByIdAndUpdate(req.params.id, { $set: newWaterInfo },{new:true},(err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "WaterInfo Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update WaterInfo" + err });
        }
    });
})

router.post('/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    WaterInfo.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Deleted WaterInfo' });
        } else {
            res.json({ error: true, msg: "Failed to Delete WaterInfo" });
        }
    });
});

module.exports = router;