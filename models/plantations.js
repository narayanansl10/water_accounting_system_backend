const mongoose = require('mongoose');
//Plantation Schema
const PlantationSchema = mongoose.Schema({
    crop_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'CropInfo',
        required:true
    },
    area:{
        type: Number,
        required: true
    },
    plantation_date:{
        type: String,
        required: true
    }
});

const Plantation = module.exports = mongoose.model('Plantation', PlantationSchema);