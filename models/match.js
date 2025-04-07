const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    team2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pendiente', 'completado'],
        default: 'pendiente',
    },
    location: {
        type: String,
        required: true,
    },
    result: {
        team1Goals: {
            type: Number,
            default: 0,
        },
        team2Goals: {
            type: Number,
            default: 0,
        },
    }
});

module.exports = mongoose.model('Match', matchSchema);