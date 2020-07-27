const express = require('express');
const router = express.Router();
var moment = require('moment');
const Plantation = require('../models/plantations');
const CropInfo = require('../models/cropinfo')
const Rainfall = require('../models/rainfall')
const Taluk = require('../models/taluks');
const { response } = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
const xl = require('excel4node');


router.post('/dummyroute', (req, res, next) => {
    Rainfall.find({ district_id: req.body.district_id }, (err, docs) => {
        res.json({ "base": docs })
    });
})
router.post('/create', (req, res, next) => {
    let newPlantation = new Plantation({
        crop_id: req.body.crop_id,
        area_of_plantation: req.body.area_of_plantation,
        survey_number: req.body.survey_number,
        plantation_date: req.body.plantation_date,
        taluk_id: req.body.taluk_id,
        village_name: req.body.village_name,
        login_details: req.body.login_details,
        water_need: 0,
        water_need_rainfall: 0,
        discharge_water_need: 0,
        discharge_water_need_rainfall: 0
    });
    CropInfo.find({ _id: req.body.crop_id }, (err, docs) => {
        var base = docs[0].base_period;
        var delta = docs[0].delta;
        var duty_const = docs[0].duty_const;
        var area = parseFloat(req.body.area_of_plantation);
        newPlantation.discharge_water_need = (area / ((duty_const * base) / delta))
        newPlantation.water_need = (area / ((duty_const * base) / delta)) * 60 * 60 * 24 * base;
        date = req.body.plantation_date.split("-");
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
                        rainfallMonth.push(data[0].xR)
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
                            avgRainfall += parseFloat(rainfallMonth[(month - 1) % 12])
                            period -= 1
                            month += 1
                        }
                        avgRainfall /= 10
                        newPlantation.discharge_water_need_rainfall = (area / ((duty_const * base) / (delta - avgRainfall)))
                        newPlantation.water_need_rainfall = (area / ((duty_const * base) / (delta - avgRainfall))) * 60 * 60 * 24 * base;
                        console.log(avgRainfall)
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

router.get('/generateExcel/:taluk_id', (req, res) => {
    jsonData = []
    Plantation.find({
        taluk_id: req.params.taluk_id,
    }, async (err, data) => {
        if (!err && data.length > 0) {
            for (i = 0; i < data.length; i++) {
                var temp = {
                    serial_no: '',
                    survey_number: '',
                    village_name: '',
                    area_of_plantation: '',
                    crop_name: '',
                    plantation_date: '',
                    water_need: '',
                    water_need_rainfall: '',
                    discharge_water_need: '',
                    discharge_water_need_rainfall: ''
                }
                let crop_loop_name = ""
                try {
                    const d = await CropInfo.find({ _id: data[i].crop_id }).catch((e) => { })
                    if (d.length > 0) {
                        crop_loop_name = d[0].crop_name;
                        console.log(crop_loop_name)
                    }
                } catch (error) {
                    res.json({ "error": error })
                }

                temp.crop_name = crop_loop_name.toString();
                temp.serial_no = (i + 1).toString();
                temp.survey_number = data[i].survey_number.toString();
                temp.village_name = data[i].village_name.toString();
                temp.area_of_plantation = data[i].area_of_plantation.toString();
                temp.plantation_date = data[i].plantation_date.toString();
                temp.water_need = data[i].water_need.toString();
                temp.water_need_rainfall = data[i].water_need_rainfall.toString();
                temp.discharge_water_need = data[i].discharge_water_need.toString();
                temp.discharge_water_need_rainfall = data[i].discharge_water_need_rainfall.toString();
                //console.log(temp)
                jsonData.push(temp)
            }
            const wb = new xl.Workbook();
            let talukName = ""
            try {
                const taluks = await Taluk.find({ _id: req.params.taluk_id })
                talukName = taluks[0].taluk_name
            } catch (error) {
                res.json({ "error": error })
            }
            // console.log(talukName)
            var worksheetName = '' + talukName + '_Crop_Details'
            const ws = wb.addWorksheet(worksheetName);
            const headingColumnNames = [
                "Serial No.",
                "Survey No.",
                "Village Name",
                "Area in Hectares",
                "Crop Name",
                "Date of Plantation",
                "Water Need in m^3",
                "Water Need in m^3 in Account of Rainfall of this district",
                "Discharge Need in m^3 / sec",
                "Discharge Need in m^3 /sec in Account of Rainfall of this district",
            ]
            //Write Column Title in Excel file
            let headingColumnIndex = 1;
            headingColumnNames.forEach(heading => {
                ws.cell(1, headingColumnIndex++)
                    .string(heading)
            });

            //Write Data in Excel file
            let rowIndex = 2;
            jsonData.forEach(record => {
                let columnIndex = 1;
                Object.keys(record).forEach(columnName => {
                    ws.cell(rowIndex, columnIndex++)
                        .string(record[columnName])
                });
                rowIndex++;
            });
            var fileName = '' + talukName + '_Crop_Details.xlsx'
            res.setHeader('Content-Type', 'application/octet-stream')
            wb.write(fileName, res);
        }
        else {
            res.json({ "error": err })
        }
    })
})

router.post('/generateGraph', (req, res) => {
    var responseData = []
    var response_water_need = {}
    var response_water_need_rainfall = {}
    datapoints = []
    Plantation.find({
        taluk_id: req.body.id,
    }, (err, data) => {
        if (!err && data.length > 0) {
            i = 0
            console.log(data.length)
            data.forEach((element) => {
                CropInfo.find({ _id: element.crop_id }, (err, docs) => {
                    i += 1
                    if (!err & docs.length > 0) {
                        expDate = moment(element.plantation_date).add(docs[0].base_period, 'days')
                        date = moment(element.plantation_date)
                        while (date < expDate) {
                            response_water_need[date.month()] ? response_water_need[date.month()] += (element.water_need / (docs[0].base_period / 30)) : response_water_need[date.month()] = (element.water_need / (docs[0].base_period / 30))
                            response_water_need_rainfall[date.month()] ? response_water_need_rainfall[date.month()] += (element.water_need_rainfall / (docs[0].base_period / 30)) : response_water_need_rainfall[date.month()] = (element.water_need_rainfall / (docs[0].base_period / 30))
                            date = date.add(1, 'M')
                        }
                        if (i === data.length) {
                            for (key in response_water_need) {
                                label = {}
                                label['x'] = key
                                label['y'] = response_water_need[key]
                                datapoints.push(label)
                            }
                            responseData.push({ type: 'splineArea', dataPoints: datapoints })
                            datapoints = []
                            for (key in response_water_need_rainfall) {
                                label = {}
                                label['x'] = key
                                label['y'] = response_water_need_rainfall[key]
                                datapoints.push(label)
                            }
                            responseData.push({ type: 'splineArea', dataPoints: datapoints })
                            res.json(responseData)
                        }
                    } else {
                        res.json({ message: element.crop_id + ":No such crop found" })
                    }
                })
            })
        }
    })
})

router.post('/generateGraphByDistrict', (req, res) => {
    responseData = []
    console.log(req.body.id)
    i = 0
    Taluk.find({ district_id: req.body.id }, (err, taluks) => {
        response_water_need = {}
        response_water_need_rainfall = {}
        taluks.forEach((taluk) => {
            Plantation.find({ taluk_id: taluk._id }, (err, data) => {
                if (!err && data.length > 0) {
                    flag = 0
                    data.forEach((element) => {
                        CropInfo.find({ _id: element.crop_id }, (err, docs) => {
                            //console.log(docs);
                            if (!err & docs.length > 0) {
                                expDate = moment(element.plantation_date).add(docs[0].base_period, 'days')
                                date = moment(element.plantation_date)
                                while (date < expDate) {
                                    response_water_need[date.month()] ? response_water_need[date.month()] += (element.water_need / (docs[0].base_period / 30)) : response_water_need[date.month()] = (element.water_need / (docs[0].base_period / 30))
                                    response_water_need_rainfall[date.month()] ? response_water_need_rainfall[date.month()] += (element.water_need_rainfall / (docs[0].base_period / 30)) : response_water_need_rainfall[date.month()] = (element.water_need_rainfall / (docs[0].base_period / 30))
                                    date = date.add(1, 'M')
                                }
                            } else {
                                res.json({ message: element.crop_id + ":No such crop found" })
                            }
                        })
                    })
                }
                i += 1
                console.log(i, taluks.length)
                if (i == taluks.length) {
                    datapoints = []
                    console.log(response_water_need)
                    for (key in response_water_need) {
                        label = {}
                        label['x'] = key
                        label['y'] = response_water_need[key]
                        datapoints.push(label)
                    }
                    responseData.push({ type: 'splineArea', dataPoints: datapoints })
                    datapoints = []
                    for (key in response_water_need_rainfall) {
                        label = {}
                        label['x'] = key
                        label['y'] = response_water_need_rainfall[key]
                        datapoints.push(label)
                    }
                    responseData.push({ type: 'splineArea', dataPoints: datapoints })
                    res.json(responseData)
                }
            })
        })
    })
})

router.post('/generateWaterNeedByDistrict', (req, res) => {
    responseData = []
    Taluk.find({ district_id: req.body.id }, (err, taluks) => {
        i = 0
        response_water_need = {}
        response_water_need_rainfall = {}
        taluks.forEach((taluk) => {
            Plantation.find({ taluk_id: taluk._id }, (err, data) => {
                if (!err && data.length > 0) {
                    data.forEach((element) => {
                        CropInfo.find({ _id: element.crop_id }, (err, docs) => {
                            if (!err & docs.length > 0) {
                                expDate = moment(element.plantation_date).add(docs[0].base_period, 'days')
                                date = moment(Date.now())
                                if (date < expDate) {
                                    response_water_need[taluk.taluk_name] ? response_water_need[taluk.taluk_name] += (element.water_need / (docs[0].base_period / 30)) : response_water_need[taluk.taluk_name] = (element.water_need / (docs[0].base_period / 30))
                                    response_water_need_rainfall[taluk.taluk_name] ? response_water_need_rainfall[taluk.taluk_name] += (element.water_need_rainfall / (docs[0].base_period / 30)) : response_water_need_rainfall[taluk.taluk_name] = (element.water_need_rainfall / (docs[0].base_period / 30))
                                }
                            } else {
                                res.json({ message: element.crop_id + ":No such crop found" })
                            }
                        })
                    })
                }
                i += 1
                if (i == taluks.length) {
                    datapoints = []
                    for (key in response_water_need) {
                        label = {}
                        label['x'] = key
                        label['y'] = response_water_need[key]
                        datapoints.push(label)
                    }
                    responseData.push({ type: 'splineArea', dataPoints: datapoints })
                    datapoints = []
                    for (key in response_water_need_rainfall) {
                        label = {}
                        label['x'] = key
                        label['y'] = response_water_need_rainfall[key]
                        datapoints.push(label)
                    }
                    responseData.push({ type: 'splineArea', dataPoints: datapoints })
                    res.json(responseData)
                }
            })
        })
    })
})

module.exports = router;