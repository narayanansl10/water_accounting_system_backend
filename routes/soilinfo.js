const express = require('express');
const router = express.Router();
const SoilInfo = require('../models/soilinfo');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/', (req, res) => {
    SoilInfo.find({}, (err, docs) => {
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