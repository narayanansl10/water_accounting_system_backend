const express = require('express');
const router = express.Router();
const Rainfall = require('../models/rainfall');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/', (req, res) => {
    Rainfall.find({district_id: req.body.district_id}, (err, docs) => {
        console.log(docs)
        if (!err) {
            res.send(docs);
        }
        else {
            res.json({ success: false })
        }

    })
})

module.exports = router;