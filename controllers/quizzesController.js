const Quiz = require('../models/quiz');
exports.createQuiz = async (req, res) => {
    try {
        const quizDate = new Date(req.body.date);
        const sixPM = new Date(quizDate);
        sixPM.setHours(18, 0, 0, 0);

        const now = new Date();
        if (quizDate > now || (quizDate.toDateString() === now.toDateString() && now < sixPM)) {
            const quiz = new Quiz(req.body);
            await quiz.save();
            res.status(201).send(quiz);
        } else {
            res.status(400).send({
                message: "Quizzes must be scheduled for a future date before 6 PM or for today before 6 PM."
            });
        }
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).send(error);
    }
};
exports.getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({});
        res.status(200).send(quizzes);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).send();
        }
        res.send(quiz);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!quiz) {
            return res.status(404).send();
        }
        res.send(quiz);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).send();
        }
        res.send(quiz);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.getQuizzesByDate = async (req, res) => {
    try {
        const dateParam = req.params.date;
        if (!dateParam) {
            return res.status(400).json({ message: "Date parameter is required." });
        }
        
        const quizzes = await Quiz.find({
            date: {
                $gte: new Date(`${dateParam}T00:00:00.000Z`),
                $lte: new Date(`${dateParam}T23:59:59.999Z`)
            }
        }).populate({
            path: 'questions',
            populate: { 
                path: 'options'
            }
        });

        if (!quizzes.length) {
            return res.status(404).json({ message: "No quizzes found for this date." });
        }

        res.json(quizzes);
    } catch (error) {
        console.error('Error retrieving quizzes by date:', error);
        res.status(500).json({ message: "Failed to retrieve quizzes", error });
    }
};
