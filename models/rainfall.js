const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId
//Rainfall Schema
const RainfallSchema = mongoose.Schema({
    district_id: {
        type: ObjectId,
        ref: 'Districts',
        required: true
    },
    JAN: {
        type: Number,
        required: true
    },
    FEB: {
        type: Number,
        required: true
    },
    MAR: {
        type: Number,
        required: true
    },
    APR: {
        type: Number,
        required: true
    },
    MAY: {
        type: Number,
        required: true
    },
    JUN: {
        type: Number,
        required: true
    },
    JUL: {
        type: Number,
        required: true
    },
    AUG: {
        type: Number,
        required: true
    },
    SEP: {
        type: Number,
        required: true
    },
    OCT: {
        type: Number,
        required: true
    },
    NOV: {
        type: Number,
        required: true
    },
    DEC: {
        type: Number,
        required: true
    }
});

const Rainfall = module.exports = mongoose.model('Rainfall', RainfallSchema, 'rainfalls')

