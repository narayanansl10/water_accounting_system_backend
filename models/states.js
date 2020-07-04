const mongoose = require('mongoose');

//State Schema
const StateSchema = mongoose.Schema({
    state_name: {
        type: String,
        required: true
    }
});

const State = module.exports = mongoose.model('State', StateSchema);