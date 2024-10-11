const express = require('express');
const Quiz = require('../models/quizModel')

exports.addQuiz = async (req,res) => {
    
        try {
            const { title, questions } = req.body;
            const quiz = new Quiz({ title, questions });
            await quiz.save();
            res.status(201).json(quiz);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

}