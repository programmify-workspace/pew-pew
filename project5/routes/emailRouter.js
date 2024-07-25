const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.get('/', (req, res) => {
    res.render('index');
})

router.post('/send', emailController);

module.exports = router;
