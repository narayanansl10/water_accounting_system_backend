const mongoose = require('mongoose');
//WaterInfo Schema
const WaterInfoSchema = mongoose.Schema({
    waterbody_name: {
        type: String,
        required: true
    },  
    taluk_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Taluk',
        required:true
    },
    water_available:{
        type: Number,
        required: true
    }
});

const WaterInfo = module.exports = mongoose.model('WaterInfo', WaterInfoSchema);