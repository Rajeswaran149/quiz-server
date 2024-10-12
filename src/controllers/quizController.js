const express = require('express');
const mongoose = require('mongoose');
const Quiz = require('../models/quizModel')
const QuizTaking = require('../models/resultModel');

exports.addQuiz = async (req,res) => {
    
        try {
            const { title, questions } = req.body;
            
            const quiz = new Quiz({ title, questions });
            console.log(quiz)
            await quiz.save();
            res.status(201).json(quiz);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

}

exports.getAllQuiz = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getQuizDetails = async (req, res) => {
    const { title } = req.body; 

    try {
        
        const quiz = await Quiz.findOne({ title });
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        
        const filteredQuiz = {
            _id: quiz._id,
            title: quiz.title,
            questions: quiz.questions.map(q => ({
                _id: q._id,
                question: q.question,
                options: q.options
                
            })),
        };

        res.json(filteredQuiz);
    } catch (error) {
        console.error("Error fetching quiz:", error.message);
        res.status(500).json({ message: 'An error occurred while fetching the quiz', error: error.message });
    }
}

exports.takeQuiz = async (req, res) => {
    const { userId, title, answers } = req.body;

    try {
      
        const quiz = await Quiz.findOne({ title });
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        
        const score = answers.reduce((total, userAnswer) => {
            const correctQuestion = quiz.questions.find(q => q.question === userAnswer.question);
            return total + (correctQuestion && correctQuestion.answer === userAnswer.answer ? 1 : 0);
        }, 0);

        
        const quizTakingRecord = new QuizTaking({
            userId: userId, 
            quizId: quiz._id, 
            answers: answers.map(ans => ({
                question: ans.question,
                answer: ans.answer,
                questionId: quiz.questions.find(q => q.question === ans.question)._id 
            })),
            score,
        });
        await quizTakingRecord.save();
        res.status(201).json({ message: 'Quiz taken successfully!', score });
    } catch (error) {
        console.error("Error taking quiz:", error.message);
        res.status(500).json({ message: 'An error occurred while taking the quiz', error: error.message });
    }
};


exports.viewResults = async (req, res) => {
  try {
    console.log(req.body.userId)
    const results = await QuizTaking.findOne({ userId: req.body.userId })
    console.log(results);
    res.json({message:"Check your Resultzzzz...", Result:results.score});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
