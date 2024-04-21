const express = require('express')
const router = express.Router();
const User = require('../models/users');
const quizController = require('../controllers/quizController')
const Quiz = require('../models/quiz')
const { fetchQuizzesByDate } = require('../services/quizService');
router.post('/initialize-user', async (req, res) => {
    const { email, date } = req.body;
    try {
        const quizzes = await fetchQuizzesByDate(date);

        // Find the user or initialize a new one
        let user = await User.findOne({ email: email });
        if (!user) {
            // If the user does not exist, create a new user
            user = new User({ email: email, quizzes: [] });
        }

        // Filter out quizzes that are already added to the user
        const existingQuizIds = user.quizzes.map(q => q.quiz_id.toString());
        const newQuizzes = quizzes.filter(quiz => !existingQuizIds.includes(quiz._id.toString()));

        // Add new quizzes to the user's quiz array
        newQuizzes.forEach(quiz => {
            user.quizzes.push({
                quiz_id: quiz._id,
                date: quiz.date,
                responses: [],
                score: 0
            });
        });

        // Save changes to the database
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