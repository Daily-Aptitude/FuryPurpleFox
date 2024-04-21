// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    quizzes: [{
        quiz_id: mongoose.Schema.Types.ObjectId,
        date: Date,
        responses: Array,
        score: Number,
    }]
});

module.exports = mongoose.model('User', userSchema);
