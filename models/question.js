const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    option_id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    options: [optionSchema],
    correct_answer: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return this.options.some(option => option.option_id === v);
            },
            message: props => `${props.value} is not a valid option ID!`
        }
    },
    solution_description: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
