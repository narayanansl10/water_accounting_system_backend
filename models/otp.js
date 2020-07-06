const mongoose = require('mongoose');
//OTP Schema
const OTPSchema = mongoose.Schema({
    OTP: {
        type: Number,
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserDetails',
        required:true
    }
});

const OTP = module.exports = mongoose.model('OTP', OTPSchema);