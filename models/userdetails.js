const mongoose = require('mongoose');
//UserDetails Schema
const UserDetailsSchema = mongoose.Schema({
    login_details: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'LoginDetails',
        required: true
    },
    taluk_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Taluk',
        required: true
    },
    village_name: {
        type:String,
        required: true
    },
    area_of_plantation: {
        type:String,
        required: true
    },
    number_of_crops: {
        type:Number,
        required: true
    },
    crop_details:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Plantation'
    }]
});

const UserDetails = module.exports = mongoose.model('UserDetails', UserDetailsSchema);