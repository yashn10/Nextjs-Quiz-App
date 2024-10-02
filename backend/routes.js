const express = require('express');
const router = express.Router();
const Question = require('./models/reactjs');


// Admin adds question
router.post('/api/questions', async (req, res) => {
    const { question, options, correctAnswer, category } = req.body;

    try {
        const newQuestion = new Question({
            question,
            options,
            correctAnswer,
            category
        });

        const saved = await newQuestion.save();
        if (saved) {
            res.status(201).json({ success: true, message: 'Question added successfully!' });
        } else {
            res.status(404).json({ success: false, error: "Failed to add question" })
        }
    } catch (error) {
        console.error("Error Details:", error);
        res.status(500).json({ success: false, message: 'Failed to add question', error: error.message });
    }
});


// Get quiz questions for users
router.get('/api/questions', async (req, res) => {
    const category = req.query.category;
    try {
        const questions = await Question.find({ category });
        res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch questions' });
    }
});


// delete quiz question
router.delete(`/api/questions/:id`, async (req, res) => {
    try {
        const questions = await Question.findByIdAndDelete(req.params.id);
        if (questions) {
            res.status(200).send({ message: "Question deleted successfully" });
        } else {
            res.status(404).send({ error: "failed to delete" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete questions' });
    }
});


// update quiz question and options
router.patch(`/api/questions/:id`, async (req, res) => {
    try {
        const questions = await Question.findByIdAndUpdate(req.params.id, req.body);
        if (questions) {
            res.status(201).send({ message: "Data Updated Successfully" });
        } else {
            res.status(404).send({ error: "failed to update" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update data' });
    }
});


// Check user answers and calculate score
router.post('/api/submit-quiz', (req, res) => {
    const { userAnswers } = req.body;
    Question.find().then((questions) => {
        let score = 0;
        questions.forEach((question, index) => {
            if (question.correctAnswer === userAnswers[index]) {
                score++;
            }
        });
        res.json({ score });
    });
});


module.exports = router;