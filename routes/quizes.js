const express = require('express');
const router = express.Router();
const quizzesController = require('../controllers/quizzesController');
router.post('/quizzes', quizzesController.createQuiz);
router.get('/quizzes', quizzesController.getQuizzes);
router.get('/quizzes/:date', quizzesController.getQuizzesByDate);
router.put('/quizzes/:id', quizzesController.updateQuiz);
router.delete('/quizzes/:id', quizzesController.deleteQuiz);
module.exports = router;
