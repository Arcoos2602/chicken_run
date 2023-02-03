const mongoose = require('mongoose');

const ChickenSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birthday: Date,
    weight: {
        type: Number,
        required: true,
    },
    steps: {
        type: Number,
        default: 0,
    },
    isRunning: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Chicken', ChickenSchema);
