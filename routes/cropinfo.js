const express = require('express');
const router = express.Router();
const CropInfo = require('../models/cropinfo');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newCropInfo = new CropInfo({
        crop_name: req.body.crop_name,
        delta: req.body.delta,
        base_period: req.body.base_period,
        duty_const: req.body.duty_const
    });
    newCropInfo.save((err, doc) => {
        if (err) {
            res.json({
                error: true,
                msg: 'Failed to Create CropInfo: ' + err
            });
        } else {
            res.json({
                error: false,
                msg: 'CropInfo Created'
            });
        }
    });
});

router.post('/', (req, res) => {
    CropInfo.find({}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            res.json({ success: false })
        }

    })
})

router.post('/update/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var newCropInfo = {
        crop_name: req.body.crop_name,
        delta: req.body.delta,
        base_period: req.body.base_period,
        duty_const: req.body.duty_const
    };
    CropInfo.findByIdAndUpdate(req.params.id, { $set: newCropInfo }, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "Crop Info Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update Crop Info" + err });
        }
    });
})

router.post('/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    CropInfo.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Deleted CropInfo' });
        } else {
            res.json({ error: true, msg: "Failed to Delete CropInfo" });
        }
    });
});

module.exports = router;