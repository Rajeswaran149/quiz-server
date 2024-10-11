const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [
        {
            question: { type: String, required: true },
            options: [String],
            answer: { type: String, required: true },
        },
    ],
        

})

module.exports = mongoose.model('Quiz', quizSchema);