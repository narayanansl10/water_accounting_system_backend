const express = require('express');
const router = express.Router();
const WaterInfo = require('../models/waterinfo');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newWaterInfo = new WaterInfo({
        unique_id: req.body.unique_id,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        tank_name: req.body.tank_name,
        village: req.body.village,
        taluk_id: req.body.taluk_id,
        max_capacity: req.body.max_capacity,
        available_capacity: req.body.available_capacity
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

router.get('/', (req, res) => {
    WaterInfo.find({}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            res.json({ 'error': err })
        }
    })
})

router.post('/waterBodyInfo', (req, res) => {
    WaterInfo.find({ _id: req.body.waterbody_id }, (err, docs) => {
        if (!err) {
            resjson = { available_capacity: 0, max_capacity: 0, percentage: 0 }
            resjson.available_capacity = docs[0].available_capacity
            resjson.max_capacity = docs[0].max_capacity
            resjson.percentage = parseFloat(docs[0].available_capacity / docs[0].max_capacity) * 100
            res.send(resjson)
        }
        else {
            res.json({ 'error': err })
        }
    })
})

router.post('/update/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var newWaterInfo = {
        unique_id: req.body.unique_id,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        tank_name: req.body.tank_name,
        village: req.body.village,
        taluk_id: req.body.taluk_id,
        max_capacity: req.body.max_capacity,
        available_capacity: req.body.available_capacity
    };
    WaterInfo.findByIdAndUpdate(req.params.id, { $set: newWaterInfo }, { new: true }, (err, doc) => {
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