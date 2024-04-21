// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    quizzes: [{
        quiz_id: mongoose.Schema.Types.ObjectId,
        date: Date,
        responses: Array,
        score: Number,
        streak_dates: [Date],
        questions: [{
            question_id: mongoose.Schema.Types.ObjectId,
            text: String,
            options: [{
                option_id: mongoose.Schema.Types.ObjectId,
                text: String
            }],
            correct_answer: String
        }]
    }]
});

module.exports = mongoose.model('User', userSchema);
