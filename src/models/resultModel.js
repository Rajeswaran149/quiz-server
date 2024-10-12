const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    question: { type: String, required: true }, // Reference to the question
    answer: { type: String, required: true }, // User's answer
});

const quizTakingSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: 'User' }, // Reference to the User model
    quizId: { type: String, required: true, ref: 'Quiz' }, // Reference to the Quiz model
    answers: [answerSchema], // Array of answers
    score: { type: Number, default: 0 }, // To store the score
    createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model('QuizTaking', quizTakingSchema);
