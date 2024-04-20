const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
// const quizController = require('../controllers/quizController')

router.post('/register', userController.registerUser);
router.get('/profile/:username', userController.getUserProfileByUsername);
router.put('/update/:username', userController.updateUserProfileByUsername);

// router.post('/quizzes/take', quizController.takeQuiz);
// router.get('/quizzes/results/:userId', quizController.getQuizResults);

module.exports = router;