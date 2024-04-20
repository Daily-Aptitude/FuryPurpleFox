const express = require('express');
const router = express.Router();
const quizzesController = require('../controllers/quizzesController');
router.post('/quizzes', quizzesController.createQuiz);
router.get('/quizzes', quizzesController.getQuizzes);
router.get('/quizzes/:id', quizzesController.getQuizById);
router.put('/quizzes/:id', quizzesController.updateQuiz);
router.delete('/quizzes/:id', quizzesController.deleteQuiz);
module.exports = router;
