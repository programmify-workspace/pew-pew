const express = require('express'),
    router = express.Router()
const quizController = require('../controllers/quiz.controller')

router.get('/quiz', quizController.getQuiz)
router.post('/submit-quiz', quizController.submitQuiz)

module.exports = router;