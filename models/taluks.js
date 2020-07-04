const mongoose = require('mongoose');
//Taluk Schema
const TalukSchema = mongoose.Schema({
    taluk_name: {
        type: String,
        required: true
    },
    district_name:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'District',
        required:true
    }
});

const Taluk = module.exports = mongoose.model('Taluk', TalukSchema);