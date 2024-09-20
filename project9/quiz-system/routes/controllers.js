import express from 'express';
import db from '../models/config/db.js';
const router = express.Router();


// Render home page
router.get('/', (req, res) => {
    res.render('index');
});

// Get quiz questions
router.get('/quiz', (req, res) => {
    db.query('SELECT * FROM questions', (err, results) => {
        if (err) throw err;
        res.render('quiz', { questions: results });
    });
});

// Handle quiz submission
router.post('/submit-quiz', (req, res) => {
    const userResponses = req.body;
    let score = 0;
    let feedback = [];

    db.query('SELECT * FROM questions', (err, questions) => {
        if (err) throw err;

        questions.forEach((question) => {
            const userAnswer = userResponses[`question_${question.id}`];
            const isCorrect = userAnswer === question.correct_option;
            feedback.push({ question: question.question, isCorrect });

            if (isCorrect) {
                score++;
            }

            db.query('INSERT INTO responses (user_id, question_id, selected_option) VALUES (?, ?, ?)', ['user1', question.id, userAnswer], (err) => {
                if (err) throw err;
            });
        });

        res.render('result', { score, total: questions.length, feedback });
    });
});

export default router;