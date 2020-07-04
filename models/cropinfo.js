const mongoose = require('mongoose');

//CropInfo Schema
const CropInfoSchema = mongoose.Schema({
    crop_name: {
        type: String,
        required: true
    },
    delta : {
        type: Number,
        required: true
    },
    base_period : {
        type: Number,
        required: true
    },
    duty_const : {
        type: Number,
        required: true
    }
});

const CropInfo = module.exports = mongoose.model('CropInfo', CropInfoSchema);