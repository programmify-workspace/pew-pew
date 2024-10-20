const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { ensureGuest } = require('../middleware/guestMiddleware');
const quizController = require('../controllers/quizController');

// router.post('/signup', quizController.signup);

router.get('/sign-in', ensureGuest, quizController.getSignin);
router.get('/sign-up', ensureGuest, quizController.getSignup);
router.post('/sign-in', ensureGuest, quizController.postSignin);
router.post('/sign-up', ensureGuest, quizController.postSignup);

// Add logout route
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/sign-in');
});

router.get('/', protect, quizController.getQuizSubjects);

router.post('/quiz', quizController.postQuizSubject);

router.get('/quiz/:id', protect, quizController.getQuiz);

router.post('/score', protect, quizController.postScore);

router.get('/score', protect, quizController.getScore);

module.exports = router;
