const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String], // Array of strings for the options
        required: true,
    },
    correctAnswer: {
        type: String, // Store the correct answer as a string
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});


const Question = mongoose.model('Question', questionSchema);
module.exports = Question;