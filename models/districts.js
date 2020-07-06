const mongoose = require('mongoose');
//District Schema
const DistrictSchema = mongoose.Schema({
    district_name: {
        type: String,
        required: true
    },
    state_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'State',
        required:true
    }
});

const District = module.exports = mongoose.model('District', DistrictSchema);