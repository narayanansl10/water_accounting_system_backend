const mongoose = require('mongoose');

//CropInfo Schema
const SoilInfoSchema = mongoose.Schema({
    soil_name: {
        type: String,
        required: true
    },
    penetration: {
        type: Number,
        required: true
    }
});

const SoilInfo = module.exports = mongoose.model('SoilInfo', SoilInfoSchema);