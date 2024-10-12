const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
    question: { type: String },
    options: [String],
    answer: { type: String },
});

const quizSchema = new mongoose.Schema({
    title: { type: String },
    questions: [questionSchema], 
});

module.exports = mongoose.model('Quiz', quizSchema);
