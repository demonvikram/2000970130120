const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainName: { type: String, required: true },
    trainNumber: { type: String, required: true },
    departureTime: {
        Hours: { type: Number, required: true },
        Minutes: { type: Number, required: true },
        Seconds: { type: Number, required: true }
    },
    seatsAvailable: {
        sleeper: { type: Number, required: true },
        AC: { type: Number, required: true }
    },
    price: {
        sleeper: { type: Number, required: true },
        AC: { type: Number, required: true }
    },
    delayedBy: { type: Number, default: 0 }
    });

module.exports = mongoose.model('Train', trainSchema);
