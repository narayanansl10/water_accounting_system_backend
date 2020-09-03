const express = require('express');
const router = express.Router();
const Taluk = require('../models/taluks');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newTaluk = new Taluk({
        taluk_name: req.body.taluk_name,
        district_id: req.body.district_id
    });
    newTaluk.save((err, doc) => {
        if (err) {
            res.json({
                error: true,
                msg: 'Failed to Create Taluk: ' + err
            });
        } else {
            res.json({
                error: false,
                msg: 'Taluk Created'
            });
        }
    });
});

router.get('/', (req, res) => {
    Taluk.find({}, (err, docs) => {
        res.send(docs);
    })
})
router.get('/talukForId/:id', (req, res) => {
    Taluk.find({ _id: req.params.id }, (err, docs) => {
        if (!err) {
            console.log(docs)
            res.send(docs[0])
        }
        else { res.json({ "error": err }) }
    })
})

router.post('/TaluksForDistrict', (req, res) => {
    if (!ObjectId.isValid(req.body.district_id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.body.district_id}`);
    Taluk.find({ district_id: req.body.district_id }, (err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            res.json({ 'error': 'cannot fetch' });
        }
    })
})
router.post('/update/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var newTaluk = {
        taluk_name: req.body.taluk_name,
        district_id: req.body.district_id
    };
    Taluk.findByIdAndUpdate(req.params.id, { $set: newTaluk }, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "Taluk Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update Taluk" + err });
        }
    });
})

router.post('/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    Taluk.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Deleted Taluk' });
        } else {
            res.json({ error: true, msg: "Failed to Delete Taluk" });
        }
    });
});

module.exports = router;