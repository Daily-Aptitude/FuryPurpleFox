const Calendar = require('../models/calendar'); // Assuming you have a Calendar model

exports.scheduleQuiz = async (req, res) => {
    const { date, quiz } = req.body;
    try {
        const calendarEntry = new Calendar({
            date,
            quiz
        });
        await calendarEntry.save();
        res.status(201).send(calendarEntry);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getQuizzesByDate = async (req, res) => {
    try {
        const calendarEntry = await Calendar.findOne({ date: req.params.date });
        if (!calendarEntry) {
            return res.status(404).send();
        }
        res.send(calendarEntry);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateScheduledQuiz = async (req, res) => {
    try {
        const calendarEntry = await Calendar.findOne({ _id: req.params.id });
        if (!calendarEntry) {
            return res.status(404).send({ message: "Calendar entry not found." });
        }
        if (req.body.date) {
            calendarEntry.date = new Date(req.body.date); 
        }
        if (req.body.quiz) {
            calendarEntry.quiz = req.body.quiz;
        }
        await calendarEntry.save();
        res.status(200).send(calendarEntry);
    } catch (error) {
        res.status(500).send({ message: "Failed to update calendar entry", error });
    }
};

exports.deleteQuizFromDate = async (req, res) => {
    try {
        const result = await Calendar.findOneAndDelete({ date: req.params.date });
        if (!result) {
            return res.status(404).send();
        }
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};
