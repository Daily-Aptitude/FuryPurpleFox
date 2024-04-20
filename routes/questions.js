const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');
router.post('/questions', questionsController.createQuestion);
router.get('/questions', questionsController.getQuestions);
router.get('/questions/:id', questionsController.getQuestionById);
router.put('/questions/:id', questionsController.updateQuestion);
router.delete('/questions/:id', questionsController.deleteQuestion);

module.exports = router;
