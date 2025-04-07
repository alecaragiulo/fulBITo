const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
        validate: {
            validator: function(v) {
                return v.length <= this.size;
            },
            message: props => `El número de jugadores no puede ser mayor que ${props.value}`
        }
    }],
    size: {
        type: Number,
        required: true,
        enum: [5, 7, 8, 11],
        default: 5
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Team', teamSchema);