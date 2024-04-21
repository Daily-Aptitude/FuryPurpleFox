const express = require('express')
const router = express.Router();
const User = require('../models/users');
const quizController = require('../controllers/quizController')
const Quiz = require('../models/quiz')
const { fetchQuizzesByDate } = require('../services/quizService');
// Adjust the path as necessary

router.post('/initialize-user', async (req, res) => {
    const { email, date } = req.body;
    try {
        const quizzes = await fetchQuizzesByDate(date);

        const user = new User({
            email: email,
            quizzes: quizzes.map(quiz => ({
                quiz_id: quiz._id,
                date: quiz.date,
                responses: [],
                score: 0,
                streak_dates: [],
                questions: quiz.questions.map(q => ({  // Ensure your user schema can accept this format
                    question_id: q._id,
                    text: q.text,
                    options: q.options.map(o => ({
                        option_id: o._id,
                        text: o.text
                    })),
                    correct_answer: q.correct_answer
                }))
            }))
        });

        await user.save();
        res.status(201).json({ message: "User initialized successfully with quizzes", user });
    } catch (error) {
        console.error('Error initializing user:', error);
        res.status(500).json({ message: "Failed to initialize user", error });
    }
});

router.post('/submit-response', quizController.submitQuizResponse);
router.get('/get-response/:email', quizController.getResponsesByEmail);
module.exports = router;