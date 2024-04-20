const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    quiz_id: { type: String, required: true, unique: true },
    number_of_questions: { type: Number, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] }
});

module.exports = mongoose.model('Quiz', quizSchema);
