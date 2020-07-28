const mongoose = require('mongoose');

const OTPSchema = mongoose.Schema({
    otp: {
        type: Number,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('otp', OTPSchema);
