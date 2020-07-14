const mongoose = require('mongoose');
//Plantation Schema
const PlantationSchema = mongoose.Schema({
    crop_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'CropInfo',
        required:true
    },
    area_of_plantation:{
        type: Number,
        required: true
    },
    plantation_date:{
        type: String,
        required: true
    },
    water_need:{
        type: Number,
        required:true
    },
    taluk_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Taluk',
        required: true
    },
    village_name: {
        type:String,
        required: true
    },
    login_details: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'LoginDetails',
        required:true
    }
});

function calculateDischarge(area,duty){
    return area/duty;
}

function calculateDuty(basePeriod,delta,rainfall){
    return (864*basePeriod)/(delta-rainfall);
}

function UserDetailsByTaluk(taluk_id){
    Plantation.find({taluk_id:req.body.taluk_id},(err,docs)=> {
        if(!err){
            res.send(docs);
        }
        else{
            res.json({'error':'Error Fetching User Details By Taluk'})
        }
    })
}

const Plantations = module.exports = mongoose.model('Plantations', PlantationSchema);