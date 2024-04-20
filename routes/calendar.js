const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/CalendarController');
router.post('/calendar', calendarController.scheduleQuiz);
router.get('/calendar/:date', calendarController.getQuizzesByDate);
router.put('/calendar/:id', calendarController.updateScheduledQuiz);
router.delete('/calendar/:date', calendarController.deleteQuizFromDate);

module.exports = router;
