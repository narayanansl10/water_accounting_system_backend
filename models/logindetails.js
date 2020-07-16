const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    },
    role: {
        type: String,
        require: true
    }
});

const LoginDetails = module.exports = mongoose.model('LoginDetails', LoginDetailsSchema);
module.exports.addLogin = function (newLogin, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newLogin.password, salt, (err, hash) => {
            if (err) throw err;
            newLogin.password = hash;
            newLogin.save(callback);
        });
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) console.log(err);
        callback(null, isMatch);
    });
}
