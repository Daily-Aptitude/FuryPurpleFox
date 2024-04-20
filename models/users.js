// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    streak: {
        count: {
            type: Number,
            default: 0
        },
        last_date: {
            type: Date,
            default: Date.now
        }
    }
});

module.exports = mongoose.model('User', userSchema);
