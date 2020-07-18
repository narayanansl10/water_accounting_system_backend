const express = require('express');
const router = express.Router();
var moment = require('moment');
const Plantation = require('../models/plantations');
const CropInfo = require('../models/cropinfo')
const Rainfall = require('../models/rainfall')
const Taluk = require('../models/taluks')
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/dummyroute', (req, res, next) => {
    Rainfall.find({ district_id: req.body.district_id }, (err, docs) => {
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
        date = req.body.plantation_date.split("/");
        day = parseInt(date[2])
        month = parseInt(date[1])
        period = (base % 30 > 15) ? parseFloat(base) / 30 + 1 : parseFloat(base) / 30
        avgRainfall = 0.0
        month = (day > 15) ? month + 1 : month
        Taluk.find({ _id: req.body.taluk_id }, (err, docs) => {
            if (!err && docs.length > 0) {
                Rainfall.find({ district_id: docs[0].district_id }, (errr, data) => {
                    if (data.length > 0) {
                        rainfallMonth = []
                        rainfallMonth.push(data[0].JAN)
                        rainfallMonth.push(data[0].FEB)
                        rainfallMonth.push(data[0].MAR)
                        rainfallMonth.push(data[0].APR)
                        rainfallMonth.push(data[0].MAY)
                        rainfallMonth.push(data[0].JUN)
                        rainfallMonth.push(data[0].JUL)
                        rainfallMonth.push(data[0].AUG)
                        rainfallMonth.push(data[0].SEP)
                        rainfallMonth.push(data[0].OCT)
                        rainfallMonth.push(data[0].NOV)
                        rainfallMonth.push(data[0].DEC)
                        while (period > 0) {
                            avgRainfall += rainfallMonth[(month - 1) % 12]
                            period -= 1
                            month += 1
                        }
                        avgRainfall /= 10
                        newPlantation.water_need_rainfall = area / ((duty_const * base) / (delta - avgRainfall));
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
                    } else {
                        res.send({ message: "Rainfall data not available" })
                    }
                })
            } else {
                res.send({ message: "District not found" })
            }
        })
    });
});

router.get('/', (req, res) => {
    Plantation.find({}, (err, docs) => {
        if (!err)
            res.send(docs);
    })
})

router.post('/PlantationForLogin', (req, res) => {
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

router.post('/generateGraph', (req, res) => {
    response = []
    Plantation.find({
        taluk_id: req.body.taluk_id,
    }, (err, data) => {
        var water_need_sum = []
        var water_need_rainfall_sum = []
        if (!err && data.length > 0) {
            data.forEach((element) => {
                CropInfo.find({ _id: element.crop_id }, (err, docs) => {
                    if (!err & docs.length > 0) {
                        expDate = moment(element.plantation_date).add(docs[0].base_period, 'days').format("DD MM YY").split(" ")
                        date = moment(element.plantation_date).format("DD MM YY").split(" ")
                    } else {
                        res.json({ message: element.crop_id + ":No such crop found" })
                    }
                })
            })
            res.json(data)
        }
    })
})

module.exports = router;