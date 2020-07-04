const mongoose = require('mongoose');
//Plantation Schema
const PlantationSchema = mongoose.Schema({
    user_details:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserDetails',
        required:true
    },
    crop_name:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'CropInfo',
        required:true
    },
    percentage:{
        type: Number,
        required: true
    },
    plantation_date:{
        type: String,
        required: true
    }
});

const Plantation = module.exports = mongoose.model('Plantation', PlantationSchema);