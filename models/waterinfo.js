const mongoose = require('mongoose');
//WaterInfo Schema
const WaterInfoSchema = mongoose.Schema({
    tank_name: {
        type: String,
        required: true
    },
    taluk_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Taluk',
        required: true
    },
    water_available: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    max_capacity: {
        type: Number,
        required: true
    },
    available_capacity: {
        type: Number,
        required: true
    },
    unique_id: {
        type: String,
        required: true
    }

});

const WaterInfo = module.exports = mongoose.model('WaterInfo', WaterInfoSchema, 'waterinfos');