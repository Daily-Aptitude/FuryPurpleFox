const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    quiz_id: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    number_of_questions: { type: Number, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] }
});

module.exports = mongoose.model('Quiz', quizSchema);
