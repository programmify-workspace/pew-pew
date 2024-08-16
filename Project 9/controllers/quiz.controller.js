const dbConnect = require('../config/db');

// Show Quiz
const getQuiz = (req, res) => {
    dbConnect.query('SELECT * FROM questions', (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Database query error');
        }

        const questions = results.map(row => {
            return {
                text: row.question_text,
                options: [row.option_a, row.option_b, row.option_c, row.option_d],
                correct_answer: row.correct_answer
            };
        });

        res.render('quiz', { questions });
    });
};

// Handle quiz submission
const submitQuiz = (req, res) => {
    dbConnect.query('SELECT * FROM questions', (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Database query error');
        }

        let score = 0;
        let feedback = [];

        results.forEach((question, index) => {
            const userAnswer = req.body[`q${index}`];
            const isCorrect = userAnswer === question.correct_answer;

            feedback.push({
                userAnswer: userAnswer || "No answer provided", // Handle case where no answer is selected
                correctAnswer: question.correct_answer,
                isCorrect: isCorrect
            });

            if (isCorrect) score++;
        });

        res.render('result', { score, totalQuestions: results.length, feedback });
    });
};

module.exports = {
    getQuiz,
    submitQuiz
};
