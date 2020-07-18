const express = require('express');
const router = express.Router();
const Plantation = require('../models/plantations');
const CropInfo = require('../models/cropinfo')
const Rainfall = require('../models/rainfall')
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/dummyroute', (req, res, next) => {
    CropInfo.find({ _id: req.body.crop_id }, (err, docs) => {
        res.json({ "base": docs })
    });
})
router.post('/create', (req, res, next) => {
    let newPlantation = new Plantation({
        crop_id: req.body.crop_id,
        area_of_plantation: req.body.area_of_plantation,
        plantation_date: req.body.plantation_date,
        taluk_id: req.body.taluk_id,
        village_name: req.body.village_name,
        login_details: req.body.login_details
    });
    CropInfo.find({ _id: req.body.crop_id }, (err, docs) => {
        var base = docs[0].base_period;
        var delta = docs[0].delta;
        var duty_const = docs[0].duty_const;
        var area = parseFloat(req.body.area_of_plantation);
        newPlantation.water_need = area / ((duty_const * base) / delta);
        console.log(newPlantation.water_need);
        console.log("Date format: " + req.body.plantation_date)
        date = req.body.plantation_date.split("/");
        console.log(date)
        day = parseInt(date[2])
        month = parseInt(date[1])
        // qty=0.0
        // period = parseFloat(base);
        // if(month==1){
        //     qty += day/30.0 * avgRainfall
        //     period-=day/30.0
        // }
        // while(period>0)
        newPlantation.save((err, doc) => {
            if (err) {
                res.json({
                    error: true,
                    msg: 'Failed to Create Plantation: ' + err
                });
            } else {
                res.json({
                    error: false,
                    msg: 'Plantation Created'
                });
            }
        });
    });
});

router.get('/', (req, res) => {
    Plantation.find({}, (err, docs) => {
        if (!err)
            res.send(docs);
    })
})

router.post('/PlantationForLogin', (req, res) => {
    console.log(req.body)
    if (!ObjectId.isValid(req.body.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.body.id}`);
    Plantation.find({ login_details: req.body.id }, (err, docs) => {
        if (docs.length != 0)
            res.send(docs);
        else
            res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.body.id}`);
    })
})

router.post('/update/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var newPlantation = {
        crop_id: req.body.crop_id,
        area_of_plantation: req.body.area_of_plantation,
        plantation_date: req.body.plantation_date,
        water_need: 0,
        taluk_id: req.body.taluk_id,
        village_name: req.body.village_name,
        login_details: req.body.login_details
    };
    Plantation.findByIdAndUpdate(req.params.id, { $set: newPlantation }, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "Plantation Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update Plantation" + err });
        }
    });
})

router.post('/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    Plantation.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Deleted Plantation' });
        } else {
            res.json({ error: true, msg: "Failed to Delete Plantation" });
        }
    });
});

module.exports = router;