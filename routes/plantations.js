const express = require('express');
const router = express.Router();
const Plantation = require('../models/plantations');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newPlantation = new Plantation({
        crop_id:  req.body.crop_id,
        area: req.body.area,
        plantation_date: req.body.plantation_date
    });
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

router.get('/',(req,res)=> {
    Plantation.find({},(err,docs)=> {
        res.send(docs);
    })
})

router.post('/update/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var newPlantation = {
        crop_id:  req.body.crop_id,
        area: req.body.area,
        plantation_date: req.body.plantation_date
    };
    Plantation.findByIdAndUpdate(req.params.id, { $set: newPlantation },{new:true},(err, doc) => {
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