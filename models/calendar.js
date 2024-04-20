const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true 
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz', 
        required: true
    }
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
