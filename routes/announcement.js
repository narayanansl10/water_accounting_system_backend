const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcement');

router.post('/create', (req, res, next) => {
    let newAnnouncement = new Announcement({
        name: req.body.name,
    });
    newAnnouncement.save((err, doc) => {
        if (err) {
            res.json({
                error: true,
                msg: 'Failed to Create Announcement : ' + err
            });
        } else {
            res.json({
                error: false,
                msg: 'Announcement reported'
            });
        }
    });
});

router.get('/', (req, res) => {
    Announcement.find({}, (err, docs) => {
        res.send(docs);
    })
})

module.exports = router;
