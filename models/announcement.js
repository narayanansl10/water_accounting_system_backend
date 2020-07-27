const mongoose = require('mongoose');

const AnnouncementSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model('Announcement', AnnouncementSchema);
