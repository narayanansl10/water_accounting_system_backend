const mongoose = require('mongoose');

//LoginDetails Schema
const LoginDetailsSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    aadhar_number: {
        type: String,
        required: true
    }
});

const LoginDetails = module.exports = mongoose.model('LoginDetails',LoginDetailsSchema);