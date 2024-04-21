const Quiz = require('../models/quiz');

async function fetchQuizzesByDate(dateParam) {
    const quizzes = await Quiz.find({
        date: {
            $gte: new Date(`${dateParam}T00:00:00.000Z`),
            $lte: new Date(`${dateParam}T23:59:59.999Z`)
        }
    }).populate({
        path: 'questions',
        populate: { path: 'options' }
    });

    return quizzes;
}

module.exports = { fetchQuizzesByDate };
