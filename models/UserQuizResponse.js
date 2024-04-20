const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    question_id: mongoose.Schema.Types.ObjectId,
    selected_option: String,
    is_correct: Boolean
});

const userQuizResponseSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quiz_id: {
        type: String,
        required: true
    },
    date_taken: {
        type: Date,
        default: Date.now
    },
    responses: [responseSchema],
    total_score: {
        type: Number,
        required: true
    },
    quiz_date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('UserQuizResponses', userQuizResponseSchema);
