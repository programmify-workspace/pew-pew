const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/quiz', async (req, res) => {
    try {
        const [questions] = await db.query('SELECT * FROM questions');
        const questionsWithOptions = await Promise.all(
            questions.map(async (question) => {
                const [options] = await db.query('SELECT option_text FROM options WHERE question_id = ?', [question.id]);
                return {
                    ...question,
                    options: options.map(opt => opt.option_text)
                };
            })
        );
        res.render('quiz', { questions: questionsWithOptions });
    } catch (err) {
        res.status(500).send('Error fetching quiz questions');
    }
});

app.post('/submit', async (req, res) => {
    try {
        const [questions] = await db.query('SELECT * FROM questions');
        let score = 0;
        const feedback = questions.map((question, index) => {
            const userAnswer = req.body[`q${index}`];
            const correct = userAnswer === question.correct_option;
            if (correct) score++;
            return { correct };
        });
        res.render('result', {
            score,
            totalQuestions: questions.length,
            feedback
        });
    } catch (err) {
        res.status(500).send('Error processing quiz results');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
