const express = require('express');
const router = express.Router();
const State = require('../models/states');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create', (req, res, next) => {
    let newState = new State({
        state_name: req.body.state_name
    });
    newState.save((err, doc) => {
        if (err) {
            res.json({
                error: true,
                msg: 'Failed to Create State: ' + err
            });
        } else {
            res.json({
                error: false,
                msg: 'State Created'
            });
        }
    });
});

router.get('/', (req, res) => {
    State.find({}, (err, docs) => {
        if (docs.length != 0) {
            res.send(docs);
        }
        else {
            res.json({ "success": false });
        }
    })
})

router.post('/update/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    var newState = {
        state_name: req.body.state_name
    };
    State.findByIdAndUpdate(req.params.id, { $set: newState }, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: "State Updated" });
        } else {
            res.json({ error: true, msg: "Failed To Update State" + err });
        }
    });
})

router.post('/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`NO RECORD WITH GIVEN ID : ${req.params.id}`);

    State.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ error: false, msg: 'Deleted State' });
        } else {
            res.json({ error: true, msg: "Failed to Delete State" });
        }
    });
});

module.exports = router;